import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FolderService from './FolderService'
import "./Folders.scss"
import { useTranslation } from "react-i18next";


const Folders = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const [btnHeight, setBtnHeight] = useState(0);
    const btnRef = useRef(null);
    const [folder, setFolder] = useState(
        {
            id: "",
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
            childrenFolder: [{}],
            parent: {}
        }
    )


    const { id } = props.value

    useEffect(() => {
        const getFolder = async () => {
            FolderService.getFolder(id).then(response => {
                setFolder(response.data)
            })
        }
        getFolder().then(r => console.log(r))
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        setBtnHeight(btnRef.current.clientHeight);
    }, [btnRef]);


    const deleteFolder = async (folderId) => {
        FolderService.deleteFolder(folderId).then((response) => {
            setFolder({ childrenFolder: folder.childrenFolder.filter((refreshFolder) => folderId !== refreshFolder.id) })
        })
    }

    const showFolderContent = async (folderId) => {
        FolderService.getFolder(folderId).then((response) => {
            let showFolder = ({
                id: response.data.id,
                name: response.data.name,
                path: response.data.path,
                className: response.data.className,
                fileDataList: response.data.fileDataList,
                childrenFolder: response.data.childrenFolder,
                parent: response.data.parent
            })
            if (folder.name === "Other") {
                navigate("/folderOther/" + showFolder.id)
            }
            else {
                navigate("/ViewGallery/" + showFolder.id)
            }
        })
    }

    return (
        <div data-testid="folders" className='h-100'>
            <div className="scrollable-div maxArea" style={{ height: `calc(100% - ${btnHeight}px)` }}>
                <table className="content-table w-100">
                    <thead>
                        <tr className="table-head">
                            <td>{t('folder')}</td>
                            <td>{t('look')}</td>
                            <td>{t('delete')}</td>
                        </tr>
                    </thead>
                    <tbody className="body table-body">
                        {folder.childrenFolder.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td><button onClick={() => showFolderContent(item.id)} className="btn btn-info">{t('look')}</button></td>
                                <td><button onClick={() => deleteFolder(item.id)} className="btn btn-danger">{t('delete')}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />

            </div>
            <div className='text-center' ref={btnRef}>
                <button
                    className="button btn"
                    onClick={() => navigate("/addFolder", { state: { folder } })}
                >
                    {t('add_folder')}
                </button>
            </div>
        </div>
    )
}

export default Folders
