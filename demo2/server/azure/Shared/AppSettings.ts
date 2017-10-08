export class AppSettings {
    public static get(name: string): string {
        return process.env[name] as string;
    }
}
