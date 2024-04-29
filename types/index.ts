//Next function type
export type InextFunction = (data: any) => void;
// Hero Banner Type
export interface IBanners {
  id?: string;
  name?: string;
  image?: {
    url?: string;
  };
  url?: string;
}

//Product Interface

export interface IProduct {
  id?: string;
  title?: string;
  description?: string;
  originalPrice?: number;
  discountPrice?: number;
  thumbnail?: {
    id?: string;
    url?: string;
  };
  images?: [
    {
      id?: string;
      url?: string;
    }
  ];
  categories?: [
    {
      id?: string;
      name?: string;
      image?: {
        url?: string;
        id?: string;
      };
    }
  ];
  property: [Object];
  quantity?: number;
  ratings?: number;
  reviews?: [
    {
      id: string;
      email: string;
      message: string;
      star: number;
    }
  ];
  slug?: string;
}

//Category Interface
export interface ICategory {
  id?: string;
  name?: string;
  image?: {
    url?: string;
    id?: string;
  };
}

//Ads Interface
export interface IAds {
  id?: string;
  title?: string;
  isActive: boolean;
  products?: [IProduct];
  expiryDate?: Date;
}

// User interface
export interface IUser {
  _id?: string;
}
