export type ApiResult<T> =
    | {
        success: true;
        data: T;
        status?: number;
    }
    | {
        success: false;
        error: string;
        status?: number;
    };

export interface ApiRequestOptions extends RequestInit {
    authorize?: boolean;
    _retried?: boolean;
}