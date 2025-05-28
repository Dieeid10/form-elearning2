import { IS_DEVELOPMENT } from './config'

const baseUrl = IS_DEVELOPMENT ? 'http://elearning-total.com:8000/' : 'http://localhost:8000'

export const urls = {
    lectorCodeMrz: `${baseUrl}/get_data_mrz`,
    lectorCuilAndAddress: `${baseUrl}/get_cuil_and_address`,
}