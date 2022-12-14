import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor() { }
  
  overviews = [
    {
      name: 'Make Year',
      value: '2019'
    },
    {
      name: 'Reg. Year',
      value: 'Jan 2020'
    },
    {
      name: 'Fuel',
      value: 'Petrol'
    },
    {
      name: 'KMs Driven',
      value: '11, 980 Kms'
    },
    {
      name: 'Engine Displacement',
      value: '1197 cc'
    },
    {
      name: 'No of Owner(s)',
      value: '1st Owner'
    },
    {
      name: 'RTO',
      value: 'GJ18'
    },
    {
      name: 'Transmission',
      value: 'Manual'
    },
    {
      name: 'Insurance Type',
      value: 'Third Party insurance'
    }
  ];

  specification = [
    {
      name: 'Mileage',
      value: '21.21 kmpl'
    },
    {
      name: 'Engine',
      value: '1197 cc'
    },
    {
      name: 'Max Power',
      value: '81.80bhp'
    },
    {
      name: 'Torque',
      value: '113Nm'
    },
    {
      name: 'Seats',
      value: '5'
    },
    {
      name: 'Color',
      value: 'Grey'
    }
  ];

  benifits = [
    {
      img: 'assets/imgs/return.png',
      title: '7 Days Money Back Guarantee'
    },
    {
      img: 'assets/imgs/guarantee.png',
      title: '6 Months Comprehensive Warranty'
    },
    {
      img: 'assets/imgs/tow-truck.png',
      title: '6 Months Pan India Road Side Assistance'
    },
    {
      img: 'assets/imgs/document.png',
      title: 'Free RC Transfer'
    }
  ];

  interior = [
    {
      no: '9.5',
      name: 'Interior Details'
    },
    {
      no: '8.5',
      name: 'Tyre'
    },
    {
      no: '10',
      name: 'Body and Frame'
    },
    {
      no: '9.5',
      name: 'Interior Details'
    },
  ];

  features = [
    {
      name: 'How often do governtment pay',
      open: false
    },
    {
      name: 'when will they pay me',
      open: false
    },
    {
      name: 'What is my total contribution',
      open: false
    },
    {
      name: 'Can i know my accrud right',
      open: false
    },
    {
      name: 'When will my certificate ready',
      open: false
    }
  ];


}
