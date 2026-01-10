import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import excelDoc from '../../../../../../assets/Flowtemp.xlsx'
import schoolService from '../../../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'
import { decryptId } from '../../../../../../utils/encryption'

const AddEducatorIndividualModal = ({ onRequestClose, classOfficial }) => {
    const queryClient = useQueryClient()
    const [fileError, setFileError] = useState('')
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [parsedEducators, setParsedEducators] = useState([])

    const schemaWithoutFile = yup.object().shape({
        stdClass: yup.string().required('Class is required'),
        educators: yup
            .array()
            .of(
                yup.object().shape({
                    email: yup
                        .string()
                        .email('Invalid email')
                        .required('Email is required'),
                    fullName: yup.string().required('Educator Name is required'),
                })
            )
            .required('At least one educator is required'),
    })

    const schemaWithFile = yup.object().shape({
        stdClass: yup.string().required('Class is required'),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(isFileUploaded ? schemaWithFile : schemaWithoutFile),
        defaultValues: {
            stdClass: classOfficial || 'Educators',
            educators: [{ email: '', fullName: '' }],
        },
    })

    const { user } = useSelector((state) => state.user)
    const schoolId = user?.isSchool ? user?._id : user?.school
    const { id } = useParams()

    const mutation = useMutation({
        mutationFn: (value) =>
            schoolService.enrollEducatorsIntoCourse(schoolId, decryptId(id), value),
        onSuccess: () => {
            toast.success('Educators invited successfully')
            queryClient.invalidateQueries(['school-single-courses'])
            onRequestClose()
        },
        onError: (error) => {
            toast.error(error?.message || 'Failed to invite educators')
        },
    })

    const onSubmit = (data) => {
        if (
            !window.confirm(
                'Are you sure you want to invite these educators?'
            )
        )
            return

        if (isFileUploaded) {
            data.educators = parsedEducators
        }

        mutation.mutate(data)
    }

    const handleExcelDownload = () => {
        const link = document.createElement('a')
        link.href = excelDoc
        link.download = 'Flowtemp.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const binaryStr = e.target.result
            const workbook = XLSX.read(binaryStr, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                defval: '',
            })

            if (jsonData.length <= 1) {
                setFileError('The uploaded file is empty or invalid')
                setIsFileUploaded(false)
                return
            }

            setFileError('')
            const headers = jsonData[0].map((header) => header.trim())
            const educatorDataArray = []

            const expectedHeaders = {
                Email: 'email',
                fullName: 'fullName',
            }

            jsonData.slice(1).forEach((row) => {
                let educatorData = {}
                headers.forEach((header, index) => {
                    const key = expectedHeaders[header] || header
                    const value = row[index]?.trim()
                    if (value) {
                        educatorData[key] = value
                    }
                })
                if (Object.keys(educatorData).length > 0) {
                    educatorDataArray.push(educatorData)
                }
            })

            setParsedEducators(educatorDataArray)
            setIsFileUploaded(true)

            reset({
                stdClass: classOfficial || 'Educators',
                educators: [{ email: '', fullName: '' }],
            })
        }

        reader.readAsBinaryString(file)
    }

    return (
        <div>
            <h2
                className='enroll-heading-flex'
                style={{ margin: '0', color: '#5B616A' }}
            >
                Add Educators
                <span
                    onClick={onRequestClose}
                    style={{ color: '#5B616A', cursor: 'pointer' }}
                >
                    <Icon icon='material-symbols-light:close' width={22} />
                </span>
            </h2>
            <hr style={{ margin: '5px' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='class-input'>
                    <label
                        htmlFor='stdClass'
                        style={{ border: 'none', paddingLeft: '0' }}
                    >
                        Class
                    </label>
                    <input
                        style={{ border: '1px solid #5b616a', backgroundColor: '#f5f5f5' }}
                        name='stdClass'
                        readOnly
                        {...register('stdClass')}
                    />
                    {errors.stdClass && (
                        <p className='error-message'>{errors.stdClass.message}</p>
                    )}
                </div>
                {!isFileUploaded && (
                    <div>
                        <p style={{ fontSize: '14px', color: '#329BD6' }}>
                            For single invite, kindly use the fields below.
                        </p>
                        <div>
                            <div className='select-flex'>
                                <div>
                                    <label>Educator's First & Last Name *</label>
                                    <input
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '.5rem',
                                        }}
                                        {...register('educators.0.fullName')}
                                    />
                                    {errors.educators?.[0]?.fullName && (
                                        <p className='error-message'>
                                            {errors.educators[0].fullName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label>Educators Email Address *</label>
                                    <input
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '.5rem',
                                        }}
                                        {...register('educators.0.email')}
                                    />
                                    {errors.educators?.[0]?.email && (
                                        <p className='error-message'>
                                            {errors.educators[0].email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <p style={{ fontSize: '14px', color: '#329BD6' }}>
                    For multiple educators, kindly upload file using the sheet (Excel)
                    attached below.
                </p>
                <div>
                    <div>
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                border: '1px solid #ECEDF0',
                            }}
                            className='file-upload-wrapper'
                        >
                            <input
                                type='file'
                                id='file-upload'
                                onChange={handleFileUpload}
                                className='file-upload-input'
                            />
                            <label
                                style={{
                                    border: 'none',
                                    paddingLeft: '0',
                                    color: '#41444c',
                                }}
                                htmlFor='file-upload'
                                className='file-upload-label'
                            >
                                {isFileUploaded ? 'File ready for upload' : 'Choose file'}
                                <Icon
                                    icon='ant-design:upload-outlined'
                                    width='24'
                                    height='24'
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        color: '#329BD6',
                                    }}
                                />
                            </label>
                        </div>
                        {fileError && (
                            <p
                                style={{
                                    color: 'red',
                                    marginTop: '10px',
                                    textAlign: 'right',
                                }}
                            >
                                {fileError}
                            </p>
                        )}
                        <span
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={handleExcelDownload}
                        >
                            Kindly use this Excel template
                            <Icon icon='vscode-icons:file-type-excel' width={20} />
                            <Icon
                                icon='ant-design:download-outlined'
                                width='24'
                                height='24'
                                style={{
                                    right: '1rem',
                                    color: '#329BD6',
                                }}
                            />
                        </span>
                    </div>
                </div>

                <hr />
                <button
                    className='modal-button'
                    type='submit'
                    style={{ backgroundColor: '#329BD6' }}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        <RotatingLines
                            strokeColor='white'
                            strokeWidth='5'
                            animationDuration='0.75'
                            width='30'
                            visible={true}
                        />
                    ) : (
                        'Send Invite'
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddEducatorIndividualModal
