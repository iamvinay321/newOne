export class CommonUtils {
    public static isValidValue(val: any) {
        if (val === undefined || val === null) {
            return false;
        }
        return true;
    }
}