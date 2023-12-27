export interface UploadImageRequest {
  id?: string;
  clinic?: string;
  device_id?: string;
  patient?: string;
  image: string;
  parent?: string;
  origin?: string;
}

// export interface UploadImageRequest {
//   image: string;
//   device_id?: string;
//   creator?: string;
//   parent?: string;
//   clinic: string;
//   patient: string;
//   origin: string;
// }
