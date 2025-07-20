"use client"

import { useEffect } from 'react';
import { preHeat } from '../../helpers/generateImage';

import Home from '../../components/ui/home';

export default function Page() {
  useEffect(() => {
    preHeat();
  }, []);

  return (
    <Home />
  )
}
