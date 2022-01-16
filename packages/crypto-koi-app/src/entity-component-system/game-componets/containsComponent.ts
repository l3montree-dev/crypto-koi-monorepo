export interface Ctor<T, Key> {
    new (...args: any[]): T;
    getComponentName(): Key;
    [key: string]: any;
}

export const containsComponent = <T, Key extends string>(
    component: Ctor<T, Key>
) => <A>(
    entity: A
): entity is A &
    {
        [k in Key]: T;
    } => {
    const componentName = component.getComponentName();
    // @ts-ignore
    return entity[componentName] !== undefined;
};

export type AttachComponent<T, Key extends string> = {
    [k in ReturnType<Ctor<T, Key>["getComponentName"]>]: T;
};
