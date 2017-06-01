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

declare interface PlanItem {
    id: string  // ?
    item_id: string // ?
    planning_document_id: string //?
    tenant_id: string   // ?
    type: 'product' | 'aa'
    plan: number // ? quantity
    percent: number
    price: number
    cost_price: number
    days: Array<{ day: number, plan: number }> // ? date, quantity
    created_at: number
    updated_at: number
    status: 'enabled' | 'disabled'
}
/*
{
  "id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "item_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "planning_document_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "tenant_id": "ef9274c9-f283-4c3d-a8f9-3c395985aa5e",
  "plan": 0,
  "type": "product",
  "percent": 0,
  "price": 0,
  "cost_price": 0,
  "days": [
    {
      "day": 0,
      "plan": 0
    }
  ],
  "created_at": 0,
  "updated_at": 0,
  "status": "enabled"
}
*/