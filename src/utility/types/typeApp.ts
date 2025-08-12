import {FieldErrors,UseFormRegister,FieldValues}    from 'react-hook-form';
import {MouseEvent}                                 from "react";

export interface OBJECT_1 {
    [key: string]:string
}
interface TEXT_PROPS {
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string|number;
    lineHeight?: string;
    color?: string;
}
export interface TEXT_STYLE_1 extends TEXT_PROPS{
    // theme:DefaultTheme;
}
export interface TEXT_STYLE_2 extends TEXT_PROPS{
    text?: string;
    className?: string;
    responsive?:string;
}
export interface TEXT_STYLE_3{
    // theme:DefaultTheme;
    background?:string;
}
interface INPUT_FIELD_1 {
    inputName:string;
    inputLabel:string;
    parentClassName:string;
    register:UseFormRegister<FieldValues>;
    // register:UseFormRegister<{}>;
    errors:FieldErrors;
    placeholder?:string;
}
interface INPUT_FIELD_2 {
    required:boolean;
    control:any;
    label: string;
    value: string;
    inputType?:string;
    listType?:string;
}
export interface TEXTAREA_TYPE extends INPUT_FIELD_1{
    validation:{[key:string]:string|number}|{}
}
export interface SELECT_TYPE extends INPUT_FIELD_1{
    validation:{};
    options:string[] | OBJECT_1;
}
export interface REACT_SELECT_TYPE extends INPUT_FIELD_1, Pick<INPUT_FIELD_2,"required" | "control">{
    showLabel?:boolean;
    validation?:any;
    options:{
        [key:string]:string|number
    };
}
export type SELECT_OPTION_TYPE = Pick<INPUT_FIELD_2, "label" | "value">
export interface INPUT_TYPE extends INPUT_FIELD_1, Pick<INPUT_FIELD_2,"inputType" >{
    validation?:any;
    defaultValue?:any
}
export interface CHECKBOX_TYPE extends Omit<INPUT_FIELD_1,"placeholder">, Pick<INPUT_FIELD_2,"listType" >{
    options:string[] | OBJECT_1;
    validation:{};
    show_label?:boolean;
}
export interface FILE_TYPE extends  Omit<INPUT_FIELD_1,"placeholder">{
    validation:{};
}
export interface IMAGE_TYPE {
    activeBorder:boolean
}
export interface IMAGE_TYPE_2 {
    width?: number;
    height?: number;
    path?: string;
    activeBorder?: boolean;
    parentClass?: string;
    eleClass?:string;
    responsive?:string;
}
export interface HEADER_TYPE {
    [key: string]: string | undefined
}

export interface TEXT_PARAGRAPH {
    title: string;
    content: string;
}

export interface HEADER_TYPE_2 extends TEXT_PARAGRAPH{
    parentClass?:string;
}

export interface TEXT_IMAGE_TYPE {
    title:TEXT_PARAGRAPH;
    sections:TEXT_PARAGRAPH[];
    img:string;
    parentClass?:string;
    firstChildClass?:string;
    showSection?:boolean;
}
export interface API_DATA_1 {
    title: OBJECT_1,
    sections: OBJECT_1[] //Array<OBJECT_1>
}
export interface API_DATA_2 {
    title: OBJECT_1,
    sections: TEXT_PARAGRAPH[]
}
export type API_DATA_3 =Array<{[key: string]:OBJECT_1}>

export interface API_DATA_4 {
    title:string;
    content:string;
    url:string;
}
export interface API_DATA_5 {
    title?:string;
    text:string;
    icon?:string;
}

export type API_DATA_6 = OBJECT_1[]

export interface SERVICE_TYPE {
    data:Array<API_DATA_5>
}

export interface TEXT_ICON_TYPE {
    text:string;
    icon:string;
}

export interface responsiveType_1 <T> {
    [key: string]:{
        [key: string]:T
    }
}

export interface cardQuestionType extends TEXT_PARAGRAPH {
    id:number;
};
export interface cardClientType extends cardQuestionType{ 
    star:number;
    image:string;
    name:string;
    location:string;
}
export interface cardPropertyType extends cardQuestionType {
    price:number;
    image:string;
    detail: {bed:number;bath:number;type:string}
};

export interface FORM_TYPE  {
    // firstName:string;
    // lastName:string;
    // email:string;
    // cityName:string;
    // availabilityDate:string;
    //roomNumber:number;
}
export interface PROPERTY_FORM_TYPE {
    [key:string]:{
        [key:string]:string|number
    }
}

export type visitWebsiteType   = (parameter: string) => (e: MouseEvent) => void;
export type CARD_4_Action_Type = (parameter: number) =>(e: MouseEvent) => void;
export type onChangeActionType = (e:MouseEvent<HTMLInputElement>,type:string)=>void
export type onErrorActionType  = (error:FieldErrors,type:string)=>void
export type propertyActionType = () => (e: MouseEvent) => void;
export type cardActionType     = (e:MouseEvent,parameter: string) => void;




export interface ERROR_TYPE {
    errors:FieldErrors;
    inputName:string;
}

export type pageLinksType ={
    [key : string]:{text:string;plink:string;}[]
}

export interface CARD2_TYPE {
    id:number;
    price:number;
    content:string;
    title:string;
    image:string;
    detail: {
        bed:number;
        bath:number;
        type:string
    }
}
export interface CARD4_TYPE {
    id:number;
    content:string;
    title:string;
}
export interface CARD5_TYPE {
    id:number;
    star:number;
    content:string;
    title:string;
    image:string;
    name:string;
    location:string;
}
export interface CARD6_TYPE extends TEXT_PARAGRAPH{
    buttonText:string;
    parentClass?:string;
    buttonClass?:string;
    showButton?:boolean;
}
export interface PaginationType {
    pagText:string;
    sliceState:string;
    paginFront:()=>boolean|void;
    paginBack:() =>boolean|void;
}

export interface BUTTON_TYPE {
    text:string;
    textClass?:string;
    type?:string;
    url?:string;
    className?:string;
    localAction?:(e: React.MouseEvent,parameter: string) => void;
}

