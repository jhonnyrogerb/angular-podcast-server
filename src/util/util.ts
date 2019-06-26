export class Util {

    public static toHttps(value: string): string {
        if (!value) return;

        if (value.match("^https://")) {
            return value;
        } else if (value.match("^http://")) {
            return value.replace("http://", "https://");
        } else if (value.match("^//")) {
            return value.replace("//", "https://");
        } else if (value.match("^/")) {
            return value.replace("^/", "https://");
        } else {
            return `https//:${value}`;
        }
    }

}
