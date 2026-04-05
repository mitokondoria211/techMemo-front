export interface TagResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagCreateRequest {
  name: string;
}
