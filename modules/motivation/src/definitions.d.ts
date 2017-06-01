declare interface Action {
    type: string
    payload?: any
}

declare interface SalesPlan {
    id: string
    name: string
    period: number // data unix time
    comment: string
    is_register: boolean // could be null
    sale_point_id: string
    sale_point_name: string
    user_fio: string
}