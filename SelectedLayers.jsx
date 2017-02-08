function getSelectedLayers()  
{  
     var doc = app.activeDocument;  
     var selIndices = getSelectedLayersIdx();  
     var selLayers = new Array();  
       
     if (selIndices.length == 1)  
     {  
          selLayers.push(doc.activeLayer);  
     }  
     else  
     {   
          for (var i=0; i<selIndices.length; i++)  
          {  
               if (makeActiveByIndex(selIndices[i], false) != -1)  
                    selLayers.push(doc.activeLayer);            
          }  
     }  
       
     return selLayers;       
}  
  
function getSelectedLayersIdx()  
{  
     var selectedLayers = new Array;  
     var ref = new ActionReference();  
     ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));  
     var desc = executeActionGet(ref);  
     if (desc.hasKey(stringIDToTypeID('targetLayers')))  
     {  
          desc = desc.getList(stringIDToTypeID('targetLayers'));  
          var c = desc.count;   
          var selectedLayers = new Array();  
          for (var i=0; i<c; i++)  
          {  
               selectedLayers.push(desc.getReference(i).getIndex());  
          }  
     }  
     else  
     {  
          var ref = new ActionReference();   
          ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('ItmI'));   
          ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));  
          selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID('ItmI')));  
     }  
     return selectedLayers;  
}  
  
function makeActiveByIndex(idx, forceVisible)  
{  
     try  
     {  
          var desc = new ActionDescriptor();  
          var ref = new ActionReference();  
          ref.putIndex(charIDToTypeID('Lyr '), idx)  
          desc.putReference(charIDToTypeID('null'), ref);  
          desc.putBoolean(charIDToTypeID('MkVs'), forceVisible);  
          executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);  
     }  
     catch(e)  
     {  
          return -1;  
     }  
}  
