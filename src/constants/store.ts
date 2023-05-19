/*
userinfo

*/
export  interface UserInfo {
    username: string;
    user_id: string;
    id: number;
    city: string;
    registe_time: string;
    column_desc: {
      gift_mall_desc: string;
      game_link: string;
      game_is_show: number;
      game_image_hash: string;
      game_desc: string;
    },
    point: number;
    mobile: string;
    is_mobile_valid: boolean;
    is_email_valid: boolean;
    is_active: number;
    gift_amount: number;
    email: string;
    delivery_card_expire_days: number;
    current_invoice_id: number;
    current_address_id: number;
    brand_member_new: number;
    balance: number;
    avatar: string;
  }
  