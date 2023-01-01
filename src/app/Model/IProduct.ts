export interface IProduct {
  no: number;
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: number;
  discountID: number;
  discount: string;
  quantity: number;
  qauntity?: number;
  selledQauntity: number;
  sellerId: String;
  files: FileToUpload[];
  images2: string[];
  ratingCount: number;
  totalRating: number;
  progress?: number;
  cartQuantity: number;
  nameAr: string;
  descriptionAr: string;
  categoryAr: string;
}
export interface FileToUpload {
  fileName: string ;
  fileAsBase64: string ;
}
