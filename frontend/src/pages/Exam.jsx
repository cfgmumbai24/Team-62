import React, { useEffect, useState, useRef } from 'react';
import './Exam.css';
import { ToastContainer, toast } from 'react-toastify';


const Exam = () => {
    const [selectedOption, setSelectedOption] = useState('story');
    const [text,setText] = useState('क्या कर रहे हो?');
    const [language,setLanguage] = useState('Hindi');
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Set text from backend
    }, [])

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault(); 

        const file = fileInputRef.current.files[0];
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); 
        formData.append('language', language);
        formData.append('text', text);
        console.log(formData);
        try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Upload response:', data); 

        try {
            const r = await fetch('http://localhost:5000/grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reference_text: text,
                    language
                })
            });
    
            if (!r.ok) {
                throw new Error(`Error while grading`);
            }
    
            const d = await r.json();
            console.log('Grading response:', d); 
            toast.success(`Status: ${d.Message}, Percentage: ${d.Percentage}`)
    
            } catch (error) {
            console.error('Error uploading file:', error);
                
            }

        } catch (error) {
        console.error('Error uploading file:', error);
            
        }
    };

    return (
        <div className="exam">
            <h1>TEST</h1>
            {/* <select className="select" id="select" value={selectedOption} onChange={handleSelectChange}>
                <option value="story">Story</option>
                <option value="para">Paragraph</option>
                <option value="sentence">Lines</option>
                <option value="words">Words</option>
                <option value="letters">Letters</option>
            </select> */}
            

            {/* <div className="topic">
                {selectedOption === 'story' && (
                    <div id="story">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                )}
                {selectedOption === 'para' && (
                    <div id="para">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                )}
                {selectedOption === 'sentence' && (
                    <div id="sentence">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                )}
                {selectedOption === 'words' && (
                    <div id="words">
                        <p>alpha beta gamma</p>
                    </div>
                )}
                {selectedOption === 'letters' && (
                    <div id="letters">
                        <p>a b c</p>
                    </div>
                )}
            </div> */}

        <div className="form">
            <form id="uploadForm" onSubmit={handleFileUpload}>
                <textarea
                    value={text}
                    style={{ height: '200px', width: '500px', fontSize: '18px' }}
                    contentEditable={false}
                />

                <input value={language} hidden/>
                <br/>
                Select File:
                <input type="file" id="myFile" name="filename" ref={fileInputRef} />
                <input type="submit" value="Upload" />
            </form>
        </div>
        </div>
    );
};

export default Exam;
