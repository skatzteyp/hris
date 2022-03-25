import React, { useState, useEffect } from 'react';

import { Button } from '@ligph/ui';
import { ReactComponent as IconUpload } from '../../../assets/images/icon-upload.svg'

import ReactFileReader from 'react-file-reader';

//import useDebounce from '../../../hooks/useDebounce';
import useTraining from '../../../hooks/useTraining';
import LoadingMessage from '../../common/LoadingMessage';

const ImportCsv = ({ show, trainingId, exam, onClose }) => {

  const {resetTrainingList, createTrainingImportCsvQuestions, processing, importCsvStatus } = useTraining();

  const [csvData, setCsvData] = useState([]);
  const [saveCsvData, setSaveCsvData] = useState(false);
  const [process, setProcess] = useState(processing);

  useEffect(() => {
    setCsvData([]);
  }, [ show ]);

  useEffect(() => {
    if (importCsvStatus){
      setProcess(processing);
      resetTrainingList();
      onClose();
    }
  }, [importCsvStatus, onClose, processing, resetTrainingList ]);

  const processOptions = ( cells ) => {
    let options = [];
    for (let opts = 1; opts <= 4; opts++) {
      options.push(cells[opts]);
    }
    return options;
  }

  const findAnswer = ( answer ) => {
    return ["A","B","C","D"].findIndex((a) => a === answer.trim());
  }

  const handleFiles = (files) => {
    setSaveCsvData(true);

    var reader = new FileReader();
    reader.onload = function(e) {

      const rawItems = reader.result;
      var rows = rawItems.split("\n");

      let questions = [];
      for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].split(",");

        let options = processOptions(cells);
        let answerIndex = findAnswer(cells[5]);
        questions.push({ "question": cells[0], "choices": options, answer: cells[5], answerIndex: answerIndex});
      }
      setCsvData(prevState => questions);
    }
    reader.readAsText(files[0]);
  }

  const handleSaveCsvData = () => {
    setProcess(true);
    setSaveCsvData(false);
    createTrainingImportCsvQuestions({ examId: exam.id, list: csvData});
  }

  return (
    <>
    {process && !importCsvStatus ?
      <LoadingMessage text="Saving"/>
      : null
    }
    <div className="py-1 h-64 overflow-scroll">
      <table className="w-full border-collapse is-darkmode">
        <thead className="border-b border-darkmode-900 text-left">
          <tr>
            <th className="px-2 py-4 relative break-all">Questions</th>
            <th className="px-2 py-4 relative break-all">Options</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          { csvData.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-1 py-1 break-all"> {item["question"]} </td>
              <td className="px-1 py-1 break-all">
                  { item["choices"].map((opt, indx) => (
                    <span key={`opt-${indx}`}>
                        {indx +1}. {opt} <br/>
                     </span>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="float-right ml-2">
      {(() => {
        if( saveCsvData && csvData.length !== 0){
          return(
            <Button
              color="blue"
              variant="fill"
              className={`m-8 right-0 bottom-0 bg-blue my-1 py-0 mx-0`}
              onClick={(e) => handleSaveCsvData(e) }
            >
                Save
          </Button>
          );
        }
      })()}
    </div>

    <ReactFileReader handleFiles={(e) => handleFiles(e) } fileTypes={'.csv'}>
      <Button
        color="orange"
        variant="fill"
        className={`m-8 right-0 bottom-0 bg-red float-right my-1 py-0 mx-0`}
      >
        <IconUpload className="stroke-current stroke-2 mr-2 transform scale-75" />
          Browse CSV
      </Button>
    </ReactFileReader>

    </>
  );
}

export default ImportCsv;
