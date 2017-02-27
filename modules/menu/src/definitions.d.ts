declare interface Action {
    type: string
    payload?: any
}

declare interface Product {
    id: string
    name: string
    product_category_id: string
    description: string
    price: number
    measure: string
}

declare interface ProductCategory {
    id: string
    icon: string
    color: string
    name: string
    lft?: number
    rgt?: number
    depth?: number
    child_menus?: ProductCategory[]
    child_categories?: ProductCategory[]
    products?: Product[]
}

declare interface MenuItem {
    id: string
    icon: string
    name: string
    color: string
    cell: number
    products: Array<Product>
    product_categories: Array<ProductCategory>
}

declare type MenuState = Array<MenuItem>
