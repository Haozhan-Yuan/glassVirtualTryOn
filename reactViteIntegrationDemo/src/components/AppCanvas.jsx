import React, { useRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import { JEELIZVTO, JEELIZVTOWIDGET } from 'jeelizvtowidget'
//import { JEELIZVTO, JEELIZVTOWIDGET } from '../../../../../npm/package/index.js'


import searchImage from '../assets/target512.jpg'



function init_VTOWidget(placeHolder, canvas, toggle_loading){
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggle_loading.bind(null, true),
      LOADING_END: toggle_loading.bind(null, false)
    },
    sku: 'empty', // SKU loadded at the beginning
    // image displayed when face is not found:
    searchImageMask: searchImage, //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
    searchImageColor: 0xeeeeee, // color of loading (face not found) animation
    searchImageRotationSpeed: -0.001, // negative -> clockwise
    callbackReady: function(){
      console.log('INFO: JEELIZVTOWIDGET is ready :)')
    },
    onError: function(errorLabel){ // this function catches errors, so you can display custom integrated messages
      alert('An error happened. errorLabel =' + errorLabel)
      switch(errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          // the user has no camera, or does not want to share it.
          break

        case 'INVALID_SKU':
          // the provided SKU does not match with a glasses model
          break

        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          // Something is wrong with the placeholder
          // (element whose id='JeelizVTOWidget')
          break
          
        case 'FATAL':
        default:
          // a bit error happens:(
          break
      } // end switch
    } // end onError()
  }) // end JEELIZVTOWIDGET.start call
}


function AppCanvas(props){
  const [open, setOpen] = useState(false); // For Dialog control
  const refCanvas = useRef();

  const toggleDialog = () => {
    setOpen(!open);
  };
  const refPlaceHolder = useRef()
  const refAdjustEnter = useRef()
  const refAdjust = useRef()
  const refChangeModel = useRef()
  const refLoading = useRef()

  const toggle_loading = (isLoadingVisible) => {
    refLoading.current.style.display = (isLoadingVisible) ? 'block' : 'none'
  }

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode()
    refAdjustEnter.current.style.display = 'none'
    refAdjust.current.style.display = 'block'
    refChangeModel.current.style.display = 'none'
  }

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode()
    refAdjustEnter.current.style.display = 'block'
    refAdjust.current.style.display = 'none'
    refChangeModel.current.style.display = 'block'
  }

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku)
  }

  useEffect(() => {
    const placeHolder = refPlaceHolder.current
    const canvas = refCanvas.current
    init_VTOWidget(placeHolder, canvas, toggle_loading)

    return () => {
      //JEELIZVTOWIDGET.destroy()
    }
  }, [])

  return (
    <>
      <Button variant="contained" onClick={toggleDialog}>Open Widget</Button>
      <Dialog open={open} onClose={toggleDialog} maxWidth="lg" fullWidth>
        <DialogTitle>Adjust Your Glasses</DialogTitle>
        <DialogContent>
          {/* Your existing widget code here, adjusted for Dialog */}
          <div className='JeelizVTOWidget'>
            <canvas ref={refCanvas} className='JeelizVTOWidgetCanvas'></canvas>
            {/* Other widget elements as needed */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AppCanvas
