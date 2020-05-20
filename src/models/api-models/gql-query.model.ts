export interface GqlQuery<T> {
    data: T | null;
    loading: boolean;
    errors: Array<string> | null;
}
