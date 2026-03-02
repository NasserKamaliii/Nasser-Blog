import { UpdatePost } from "../api/responseType";
import { PostFormState } from "../store/types/storesType";

export const enhanceFormUpdate = (form: Partial<PostFormState["form"]>, id: string) : UpdatePost => {

    return{
        id,
        ...form
    }as UpdatePost;

}