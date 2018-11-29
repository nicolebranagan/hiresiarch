import React, { PureComponent } from 'react';
import { fromJS, List } from 'immutable';
import { HIRES_WIDTH, HIRES_BYTE_WIDTH, HIRES_HEIGHT, Colors, ColorCodes } from '../Constants';
import { HiresRowRecord, CopyDataRecord } from '../Records';
import SelectorBox from './SelectorBox';
import DrawingBox from './DrawingBox';
import ControlRow from './ControlRow';
import SaveScreenData, { SaveCopyArea } from '../utils/SaveScreenData';
import LoadScreenData from '../utils/LoadScreenData';
import ColorPalette from './ColorPalette';
import SaveModal from './SaveModal';

export default class HiresContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: List(Array(HIRES_HEIGHT).fill(HiresRowRecord({
        pixels: fromJS(Array(HIRES_WIDTH).fill(0)),
        offsets: fromJS(Array(HIRES_BYTE_WIDTH).fill(false)),
      }))),
      color: true,
      selectedColor: Colors.WHITE,
      dragging: false,
      startx: 0,
      starty: 0,
      drawingmult: 2,
      copy: null,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onMouseDown = () => {
    this.setState({dragging: true});
  }

  onMouseUp = () => {
    this.setState({dragging: false});
  }

  onKeyDown = (e) => {
    const ctrlKey = e.ctrlKey || e.metaKey;
    const { drawingmult, starty, startx } = this.state;
    if (e.key === 'c' && ctrlKey) {
      this.onCopy();
    } else if (e.key === 'v' && ctrlKey) {
      this.onPaste();
    } else if (e.key === 'ArrowUp') {
      this.setState({
        starty: Math.max(starty - drawingmult * 8, 0)
      });
    } else if (e.key === 'ArrowDown') {
      this.setState({
        starty: Math.min(starty + drawingmult * 8, HIRES_HEIGHT - drawingmult*8)
      });
    } else if (e.key === 'ArrowLeft') {
      this.setState({
        startx: Math.max(startx - drawingmult * 7, 0)
      });
    } else if (e.key === 'ArrowRight') {
      this.setState({
        startx: Math.min(startx + drawingmult * 7, HIRES_WIDTH - drawingmult*7)
      });
    }
  }

  onLoad = (e) => {
    const file = e.target.files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.setState({data: LoadScreenData(e.target.result)})
    };
    fileReader.readAsText(file);
  }

  onCopy = () => {
    const { data, startx, starty, drawingmult } = this.state;

    const rowsToCopy = drawingmult * 8;
    const colsToCopy = drawingmult * 7;

    const copy = CopyDataRecord({
      rows: data.slice(starty, starty+rowsToCopy),
      x: startx,
      width: colsToCopy
    });
    this.setState({copy});
  }

  onPaste = () => {
    const { data, startx, starty, copy: { rows, x, width } } = this.state;
    let newData = data;
    for (let j = 0; j < rows.size; j++) {
      const { pixels, offsets } = data.get(starty + j);
      const newOffsets = offsets.splice(startx / 7, width / 7, ...(rows.get(j).offsets.slice(x/7, (x+width)/7).toArray()));
      const newPixels = pixels.splice(startx, width, ...(rows.get(j).pixels.slice(x, (x+width)).toArray()));

      const newRowData = new HiresRowRecord({
        pixels: newPixels,
        offsets: newOffsets,
      });
      newData = newData.set(starty + j, newRowData);
    }
    this.setState({data: newData});
  }

  onSaveToClipboard = () => {
    const { data, startx, starty, drawingmult } = this.state;

    const rowsToCopy = drawingmult * 8;
    const colsToCopy = drawingmult * 7;

    const copy = CopyDataRecord({
      rows: data.slice(starty, starty+rowsToCopy),
      x: startx,
      width: colsToCopy
    });

    const copybytes = SaveCopyArea(copy);
    navigator.clipboard.writeText(copybytes).then(() => console.log('success!')).catch(err => console.log(err))
  }

  onToggleColor = (event) => {
    this.setState({
      color: event.target.checked,
      selectedColor: event.target.checked ? this.state.selectedColor : Colors.BLACK,
    });
  }

  setXY = (y, x) => {
    const { drawingmult } = this.state;
    const startx = ((x / (7*drawingmult)) | 0) * 7*drawingmult;
    const starty = ((y / (8*drawingmult)) | 0) * 8*drawingmult;

    this.setState({startx, starty});
  }

  drawSelectedColor = (row, column) => {
    const { data, selectedColor, color } = this.state;
    if (color) {
      // Essentially, we treat the resolution in color mode as having halved
      column = Math.floor(column / 2) * 2;
    }
    const byte = Math.floor(column / 7);
    let newData = data;
    if (color) {
      const codes = ColorCodes[selectedColor];
      if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
        newData = newData.setIn([row, 'offsets', byte], false);
      } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
        newData = newData.setIn([row, 'offsets', byte], true);
      }
      newData = newData.setIn([row, 'pixels', column], codes[0]);

      const nextByte = Math.floor((column + 1) / 7)
      if (selectedColor === Colors.VIOLET || selectedColor === Colors.GREEN) {
        newData = newData.setIn([row, 'offsets', nextByte], false);
      } else if (selectedColor === Colors.BLUE || selectedColor === Colors.ORANGE) {
        newData = newData.setIn([row, 'offsets', nextByte], true);
      }
      newData = newData.setIn([row, 'pixels', column+1], codes[1]);
    } else {
      newData = newData.setIn([row, 'pixels', column], selectedColor === Colors.BLACK ? 0 : 1);
    }

    this.setState({
      data: newData,
    });
  }

  render() {
    const { data, color, dragging, startx, starty, selectedColor, drawingmult } = this.state;

    return (
      <div>
        <div>
          <button onClick={this.onCopy}>Copy</button>
          <button onClick={this.onPaste}>Paste</button>
          <SaveModal />
          <button onClick={() => {SaveScreenData(data)}}>Export Screen</button>
          <input type="file"
            id="openFile" name="file"
            accept=".dat" onChange={this.onLoad}/>
          <button onClick={this.onSaveToClipboard}>Export Selection To Clipboard</button>
        </div>
        <SelectorBox 
          data={data} 
          color={color} 
          dragging={dragging}
          x={startx} 
          y={starty} 
          setXY={this.setXY} 
          drawingmult={drawingmult}
        />
        <DrawingBox 
          data={data} 
          color={color} 
          dragging={dragging} 
          startx={startx} 
          starty={starty}
          drawingmult={drawingmult}
          drawSelectedColor={this.drawSelectedColor} 
        />
        <ColorPalette
          color={color}
          selectedColor={selectedColor}
          setSelectedColor={selectedColor => this.setState({selectedColor})}
        />
        <ControlRow
          color={color}
          drawingmult={drawingmult}
          onToggleColor={this.onToggleColor}
          setDrawingmult={({target: { value }}) => this.setState({drawingmult: value})}
        />
      </div>
    );
  }
}
