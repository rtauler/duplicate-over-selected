//@include "SelectedLayers.jsx"

var selectedLayers = getSelectedLayers();
var first = selectedLayers[0];  
var placeholders = selectedLayers.slice(1);
var docRef = activeDocument;
var layersSelected = "";
var layerindex = 1;

for (i = 0; i < placeholders.length; i++){
	//duplica la capa a replicar
	var originalplaceholdername = placeholders[i].name;
	var originalfirstname = first.name;
	var duplicated = first.duplicate();
	//defineix com actiu la duplicada
	docRef.activeLayer = duplicated
	//el coloca a la posicio correcte segons la selecció de l'user
	duplicated.move(placeholders[i], ElementPlacement.PLACEBEFORE);
	//posa nom index
	placeholders[i].name = placeholders[i].name + "@" + layerindex;
	//defineix placeholder com actiu
	docRef.activeLayer = placeholders[i];
	//selecciona el fons del placeholder
	makeselection();
	//defineix duplicated com actiu
	docRef.activeLayer = duplicated;
	//align duplicated with its placeholder
	alignLayers();
	//clean placeholder name with initial value
	placeholders[i].name = originalplaceholdername;
	//clean duplicated item name
	duplicated.name = originalfirstname;
	//deselect last one
	unSelect();
	//increment by 1 the index
	layerindex++;
}

function addToSelectedLayers(){
var idslct = charIDToTypeID( "slct" );
    var desc24 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref11 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref11.putName( idLyr, "BG@"+layerindex );
    desc24.putReference( idnull, ref11 );
    var idselectionModifier = stringIDToTypeID( "selectionModifier" );
    var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
    var idaddToSelection = stringIDToTypeID( "addToSelection" );
    desc24.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc24.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list10 = new ActionList();
        list10.putInteger( 5 );
        list10.putInteger( 46 );
    desc24.putList( idLyrI, list10 );
executeAction( idslct, desc24, DialogModes.NO );

}

function makeselection(){
var idsetd = charIDToTypeID( "setd" );
    var desc298 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref194 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref194.putProperty( idChnl, idfsel );
    desc298.putReference( idnull, ref194 );
    var idT = charIDToTypeID( "T   " );
        var ref195 = new ActionReference();
        var idPath = charIDToTypeID( "Path" );
        var idPath = charIDToTypeID( "Path" );
        var idvectorMask = stringIDToTypeID( "vectorMask" );
        ref195.putEnumerated( idPath, idPath, idvectorMask );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref195.putEnumerated( idLyr, idOrdn, idTrgt );
    desc298.putReference( idT, ref195 );
    var idVrsn = charIDToTypeID( "Vrsn" );
    desc298.putInteger( idVrsn, 1 );
    var idvectorMaskParams = stringIDToTypeID( "vectorMaskParams" );
    desc298.putBoolean( idvectorMaskParams, true );
executeAction( idsetd, desc298, DialogModes.NO );
}

function alignLayers(){
	var idAlgn = charIDToTypeID( "Algn" );
    var desc106 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref74 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref74.putEnumerated( idLyr, idOrdn, idTrgt );
    desc106.putReference( idnull, ref74 );
    var idUsng = charIDToTypeID( "Usng" );
    var idADSt = charIDToTypeID( "ADSt" );
    var idAdCV = charIDToTypeID( "AdCV" );
    desc106.putEnumerated( idUsng, idADSt, idAdCV );
executeAction( idAlgn, desc106, DialogModes.NO );
}

function unSelect(){
	var idsetd = charIDToTypeID( "setd" );
    var desc567 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref360 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref360.putProperty( idChnl, idfsel );
    desc567.putReference( idnull, ref360 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idNone = charIDToTypeID( "None" );
    desc567.putEnumerated( idT, idOrdn, idNone );
executeAction( idsetd, desc567, DialogModes.NO );
}

