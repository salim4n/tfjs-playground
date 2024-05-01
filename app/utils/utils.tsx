
import { ColumnGroupType, ColumnType } from "antd/es/table";


export const underConstruct = "https://reseau-ehpad-paysbasque.org/wp-content/uploads/2021/06/enconstruction-1536x724.png;"


const checkEveryField = (item: any, filter: string): boolean => {
    try {
      return Object.keys(item).some((key) => {
        if (typeof item[key] === "string" && item[key].toLowerCase().includes(filter.toLowerCase())) 
        return true;
        if (typeof item[key] === "number" && item[key].toString().toLowerCase().includes(filter.toLowerCase())) return true;
        if (item[key] instanceof Date && item[key].toString().toLowerCase().includes(filter.toLowerCase())) return true;
        if (typeof item[key] === "object" && item[key] !== null) {
          return checkEveryField(item[key], filter);
        }
        return false;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  export const filteredList = (list: any[], filter: string) => {
    try {
      return list.filter((item) => checkEveryField(item, filter));
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  type CustomColumnType<T> = ColumnType<T> | ColumnGroupType<T>;
  export const generateColumns = (data:any): CustomColumnType<any>[] => {
        const columns: CustomColumnType<any>[]= [];
        if (data && data.length > 0 && data[0]) {
          let maxKeysObj = data[0];
          let maxKeys = Object.keys(data[0]).length;
        
          data.forEach((obj: {}) => {
            const numKeys = Object.keys(obj).length;
            if (numKeys > maxKeys) {
            maxKeys = numKeys;
            maxKeysObj = obj;
            }
          });
          const headers = Object.keys(maxKeysObj);
          headers.forEach((header) => {
            columns.push({
              title: header,
              dataIndex: header,
              key: header,
            });
          });
        }
        return columns;
    }

    