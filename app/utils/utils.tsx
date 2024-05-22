
import { ColumnGroupType, ColumnType } from "antd/es/table";
import { type DetectedObject } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs'

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

    export function drawRect(
      detections: DetectedObject[],
      context: CanvasRenderingContext2D,
    ) {
      detections.forEach((predication) => {
        const [x, y, width, height] = predication.bbox;
    
        const score = (predication.score * 100).toFixed(2) + '%';
        const label = predication.class.toUpperCase() + ' - ' + score;
    
        // draw bounding box
        context.font = '16px Arial';
        context.strokeStyle = 'tomato';
        context.lineWidth = 3;
        context.strokeRect(x, y, width, height);
    
        // draw label bg
        context.fillStyle = 'tomato';
        const textW = context.measureText(label).width + 10;
        context.fillRect(x, y, textW, -16);
    
        // text on top
        context.fillStyle = '#000000';
        context.fillText(label, x, y);
      });
    }



    export async function normalizeData(data) {
      // Convertir les données en Tensor
      const tensorData = tf.tensor2d(data.map(item => Object.values(item)));
    
      // Calculer le min et le max pour chaque colonne
      const min = tensorData.min(0);
      const max = tensorData.max(0);
    
      // Normaliser les données
      const normalizedData = tensorData.sub(min).div(max.sub(min));
    
      return normalizedData.arraySync();
    }


    export const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    