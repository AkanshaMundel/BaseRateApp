export class FieldDataService{
    static getDefaultField(initial:string=''){
        const d:FieldData={
            value:initial,
            isValid:undefined,
            error:undefined
        }
        return d;
    }
    static registerValidator(data:string,verdict:{isValid:boolean},...validators:Validator[]){
        for(let validator of validators){
            const result=validator(data);
            if(result){
                verdict.isValid=false;
                return result;
            }
        }
    }
    static clubValidators(...validators:Validator[]){
        return (d:string)=>{
            for(let validator of validators){
                const verdict=validator(d);
                if(verdict) return verdict;
            }
            return;
        }
    }
}

export class Validators{
    static validateInt(data:string){
        const transformed=parseFloat(data);
        if(Number.isNaN(transformed)) return "not an valid Number";
        if(Number.isInteger(transformed)==false) return "not an integer";
    }
    static validateFloat(data:string){
        const transformed=parseFloat(data);
        if(Number.isNaN(transformed)) return "not an valid Number";
    }
    static validateNull(data:string){
        if(data.trim().length==0) return 'required';
    }
    static min(data:string,value:number){
        const transformed=parseFloat(data);
        if(Number.isNaN(transformed)) return "not an valid Number";
        if(transformed<value) return "value cannot be less than "+ value;        
    }
    static max(data:string,value:number){  
        const transformed=parseFloat(data);
        if(Number.isNaN(transformed)) return "not an valid Number";
        if(transformed>value) return "value cannot be greater than "+ value;  
    }
    static email(data:string){
        const verdict=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data);
        if(!verdict) return "not a valid email";
    }
}