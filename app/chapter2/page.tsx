
"use client";

import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

import { Empty } from "antd";
import { underConstruct } from "../utils/utils";
import { useEffect, useState } from "react";

export default function chapter2(){
    const [visor, setVisor] = useState<any>()

    useEffect(() => {
        const visor = tfvis.visor();
        visor.el.style.color = 'black';
        setVisor(visor)
      }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Empty image={underConstruct} description="" />
            
        </div>
    )

}