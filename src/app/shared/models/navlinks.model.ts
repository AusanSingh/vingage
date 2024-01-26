export interface NavLinks{
    name: string,
    route: string,
    icon: string,
    children?:NavLinks[],
    isCollapsed?: boolean,
    id: number
}