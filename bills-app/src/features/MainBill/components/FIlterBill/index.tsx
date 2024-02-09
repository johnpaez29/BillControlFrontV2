import { useState } from "react";
import { ElementState } from "../../types/ElementState";
import { Select } from "../../../../components/Select";
import { Option } from "../../../../types/Option/Option";
import { CheckBox } from "../../../../components/CheckBox";
import { GetBill } from "../../../../types/Bills/GetBill";
import { distinct as distinct } from "../../../../utils/util";

type FilterBillProps = {
    serviceFilter: ElementState | any;
    serviceList:  GetBill[]   
}

export function FilterBill (props : FilterBillProps) {

    const [elementState, SetElementState] = useState<ElementState | any>(
        {
            selectState: '', 
            selectValue: '',
            checkAll: false
        });

    const handlerChange = (e: any) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            const elementFilter = {
                [e.target.name]: value
            };
            SetElementState(elementFilter);

            props.serviceFilter({ [e.target.name]: value });
        }

    return (
        <div>
        <div>
          <h4 className='mt-2'>Servicio a consultar: </h4>
        </div>
        <div>
          <div className='row mb-3'>
            <Select 
              class="col form-select form-select-sm mx-5"
              disable={elementState.checkAll ?? false}
              name="selectValue"
              onChange={handlerChange}
              data={props.serviceList.filter((value, index, array) => distinct('name',value.name, index, array)).map<Option>(service => { 
                return {
                  key:service.idBill ?? '',
                  value:service.idBill ?? '',
                  text:service.name
                }})}
            /> 
            <Select 
              class="col form-select form-select-sm mx-5"
              disable={elementState.checkAll ?? false}
              name="selectState"
              onChange={handlerChange}
              data={[...new Set(props.serviceList.map(service => service.state))] 
                .map<Option>(service => {  
                return {
                  key:service,
                  value:service,
                  text:service
                }})}
            />  
          </div>
          <div>
            <CheckBox 
              name='checkAll'
              onChange={handlerChange}
              class="mx-2 col-1"
              text="Mostrar todos los servicios activos."
            />
          </div>
        </div>
        <hr />
      </div>
    )
    
}