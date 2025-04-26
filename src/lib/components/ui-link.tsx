'use client'

import Link from 'next/link';
import React, { ComponentPropsWithRef } from 'react';
import LoadingIndicator from './ui-indicador-loading-link';

 interface Props extends ComponentPropsWithRef<typeof Link> {
    namePath:string;
 } 

export function UiLink ({namePath, ...props}:Props) {
  return (
    <Link {...props}>
        {namePath} 
        <LoadingIndicator />
    </Link>
  );
};
