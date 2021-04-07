export const CONFIG = {
    get(configKey: string): string {
        const value = process.env[`npm_config_${configKey}`]
        if (value == null) {
            throw new Error(
                `
                Configuration error: npm_config_${configKey} is missing.
                Make sure it is defined in .npmrc file or passed as cli flag.
                `
            )
        }
        return value
    }
}
