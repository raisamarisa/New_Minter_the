import Head from 'next/head'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { Mint } from '../components/Home/Mint'
import {useAppSelector,useAppdispatch} from "../hooks/redux"



export default function  Home (){
  // const {data,error} = useTodosQuery()
  // console.log(data);
  // console.log(error);

  return (
 
<div  id="center">

<Mint/>
</div>

  )
}

