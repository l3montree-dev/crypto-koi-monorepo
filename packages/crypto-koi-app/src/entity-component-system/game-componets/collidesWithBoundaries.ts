export default class CollidesWithBoundaries {
    static getComponentName() {
        return "collidesWithBoundaries" as const;
    }

    static attach<T>(
        entity: T,
        concrete: CollidesWithBoundaries
    ): T &
        {
            [key in ReturnType<
                typeof CollidesWithBoundaries["getComponentName"]
            >]: CollidesWithBoundaries;
        } {
        return {
            ...entity,
            [CollidesWithBoundaries.getComponentName()]: concrete,
        };
    }

    constructor() {
        // silence
    }
}
