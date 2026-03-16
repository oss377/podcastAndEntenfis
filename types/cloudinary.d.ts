declare module 'cloudinary' {
  export namespace v2 {
    function config(options: {
      cloud_name?: string;
      api_key?: string;
      api_secret?: string;
      secure?: boolean;
    }): void;

    namespace uploader {
      function upload_stream(
        options: {
          resource_type?: string;
          folder?: string;
          public_id?: string;
          tags?: string[];
        },
        callback: (error: any, result: any) => void
      ): any;
    }
  }

  export type UploadApiResponse = {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    moderation: string[];
    access_control: string[];
    context: object;
    metadata: object;
  };

  export type UploadApiErrorResponse = {
    message: string;
    name: string;
    http_code: number;
  };
}