import { defaultAdminRegionFields, defaultAdminRegionRelations } from "."

import { EntityManager } from "typeorm"
import { IsString } from "class-validator"
import { Region } from "../../../.."
import RegionService from "../../../../services/region"
import { validator } from "../../../../utils/validator"

/**
 * @oas [post] /regions/{id}/payment-providers
 * operationId: "PostRegionsRegionPaymentProviders"
 * summary: "Add Payment Provider"
 * description: "Adds a Payment Provider to a Region"
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Region.
 * requestBody:
 *   content:
 *     application/json:
 *       schema:
 *         required:
 *           - provider_id
 *         properties:
 *           provider_id:
 *             description: "The ID of the Payment Provider to add."
 *             type: string
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.regions.addPaymentProvider(region_id, {
 *         provider_id: 'manual'
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request POST 'localhost:9000/admin/regions/{id}/payment-providers' \
 *       --header 'Authorization: Bearer {api_token}' \
 *       --header 'Content-Type: application/json' \
 *       --data-raw '{
 *           "provider_id": "manual"
 *       }'
 * tags:
 *   - Region
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             region:
 *               $ref: "#/components/schemas/region"
 */
export default async (req, res) => {
  const { region_id } = req.params
  const validated = await validator(
    AdminPostRegionsRegionPaymentProvidersReq,
    req.body
  )

  const regionService: RegionService = req.scope.resolve("regionService")
  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await regionService
      .withTransaction(transactionManager)
      .addPaymentProvider(region_id, validated.provider_id)
  })

  const region: Region = await regionService.retrieve(region_id, {
    select: defaultAdminRegionFields,
    relations: defaultAdminRegionRelations,
  })
  res.status(200).json({ region })
}

export class AdminPostRegionsRegionPaymentProvidersReq {
  @IsString()
  provider_id: string
}
