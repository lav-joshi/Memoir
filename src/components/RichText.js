import React from 'react'
import '../App.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichText = (props) => {

    const custom_config = {
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            '|',
            'imageUpload',
            'undo',
            'redo'
          ]
        },
        table: {
          contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        }
      }


    // const [text, setText] = useState("");
    return (
        <div className="App">
            <div className="editor">
                <CKEditor 
                  config={custom_config}
                  editor={ClassicEditor} 
                  data={props.description} 

                  onChange={(event,editor)=>{
                    const data = editor.getData();
                    props.onDescriptionChange(data);
                  }}
                />
            </div>
        </div>
    )
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader)
    }
}

class MyUploadAdapter {

    constructor(props) {
        this.loader = props
        this.url = "https://memoirsbackend.herokuapp.com/blog/bbbb"
    }

    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            }));
    }

    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/json');
    }

    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ));
        xhr.addEventListener( 'abort', () => reject() );

        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
          
            resolve({
                default: response.imageURL
            });
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }
   
  
    _sendRequest(file) {
      
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.xhr.send(JSON.stringify({ data: reader.result }));
        };
    }

}



export default RichText
