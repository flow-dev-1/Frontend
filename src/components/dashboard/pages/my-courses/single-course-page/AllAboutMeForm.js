
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setToken } from "../../../../../redux/reducers/jwtReducer";
import userService from '../../../../../services/api/users';
import { useDispatch } from "react-redux";




export default function AllAboutMeForm() {

    const dispatch = useDispatch();
    // const [formData, setFormData] = useState(null);
    const [currentForm, setCurrentForm] = useState(1);
    const [nextButtonColor, setNextButtonColor] = useState('#D6D6D6');
    const [formData, setFormData] = useState({
        nicePerson: false,
        funnyPerson: false,
        goodReading: false,
        goodMath: false,
        sporty: false,
        helpingOthers: false,
        calmPerson: false,
    });


    const schema = yup.object().shape({
        favfood: yup.string().required('Favorite Food Input is required'),
        favanimal: yup.string().required('Favorite Animal Input is required'),
        favpet: yup.string().required('Favorite Pet Input is required'),
        favsubject: yup.string().required('Favorite Subject Input is required'),

        likeone: yup.string().required('Like input is required'),
        liketwo: yup.string().required('Another Likes is required'),
        funfacteone: yup.string().required('Fun fact is required'),
        funfacttwo: yup.string().required('Another Fun fact is required'),

        favcolor: yup.string().required('Favorite colour is required'),
        job: yup.string().required('Job Input is required'),
        bestfriend: yup.string().required('Best friend input is required'),
        hobby: yup.string().required('Your hobby is required'),

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: userService.register, // Assuming userService.register is your API call function
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            //   toast.success(data.message);
            dispatch(setToken(data?.token));

        },
        onError: (error) => {
            console.error('Registration error:', error);
            //   toast.dismiss()
            //   toast.error(error?.message);
            //   toast.error(error || 'Registration failed');
        },
    });



    const onSubmit = (data) => {

        if (data.first_name) {
            // This is 4 resend otp
            mutation.mutate(data);
        } else {
            const formData = {
                favorite_food: data.favfood,
                favorite_animal: data.favanimal,
                favorite_pet: data.favpet,
                favorite_subject: data.favsubject,

                favorite_like_one: data.likeone,
                favorite_liketwo_one: data.liketwo,
                fun_fact_one: data.funfacteone,
                fun_fact_two: data.funfacttwo,
                favorite_subject: data.favsubject,

                favorite_color: data.favcolor,
                favorite_job: data.job,
                favorite_hobby: data.hobby,
                best_friend: data.bestfriend,

            };
            setFormData(formData)
            mutation.mutate(formData);
        }
    };


    const handleNext = () => {
        setCurrentForm(currentForm + 1);
    };
    const handlePrevious = () => {
        setCurrentForm(currentForm - 1);
    };





    const handleInputChange = (fieldName, value) => {
        if (value.trim() !== '') {
            setNextButtonColor('#4B7E31');
        } else {
            setNextButtonColor('#D6D6D6');
        }
    };

    const handleCheckboxChange = (fieldName, checked) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: checked
        }));
    };


    const renderFormContent = () => {
        switch (currentForm) {
            case 1:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="ph:heart-duotone" />
                                <h5>What is your Favorites</h5>
                                <p>{"(What is your Favorite)"}</p>
                            </div>

                            <form className=" row custom-gutter mt-2">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>FOOD: </label>
                                        <input type="text" placeholder="Type here..." {...register('favfood')} />
                                        {errors.favfood && <p className="error-message">{errors.favfood.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ANIMAL: </label>
                                        <input type="text" placeholder="Type here..." {...register('favanimal')} />
                                        {errors.favanimal && <p className="error-message">{errors.favanimal.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>PET: </label>
                                        <input type="text" placeholder="Type here..." {...register('favpet')} />
                                        {errors.favpet && <p className="error-message">{errors.favpet.message}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>SUBJECT: </label>
                                        <input type="text" placeholder="Type here..." {...register('favsubject')} onChange={(e) => handleInputChange('favsubject', e.target.value)} />
                                        {errors.favsubject && <p className="error-message">{errors.favsubject.message}</p>}
                                    </div>
                                </div>

                            </form>

                            <button className="btn about-me-form-btn btn-next mx-2"
                                style={{ backgroundColor: nextButtonColor }}
                                onClick={handleNext}
                                disabled={nextButtonColor === '#D6D6D6'}>
                                Next {">>>"}
                            </button>

                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="mingcute:thumb-up-line" />
                                <h5>I Like</h5>
                                <p>{"(Two things I really like)"}</p>
                            </div>

                            <form className=" mt-2">

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('likeone')} />
                                        {errors.likeone && <p className="error-message">{errors.likeone.message}</p>}
                                    </div>
                                </div>

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('liketwo')} onChange={(e) => handleInputChange('liketwo', e.target.value)} />
                                        {errors.liketwo && <p className="error-message">{errors.liketwo.message}</p>}
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Next {">>>"}
                                </button>
                            </div>


                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="dashicons:format-chat" />
                                <h5>People say that...</h5>
                                <p>{"(What people say about you?)"}</p>
                            </div>

                            <form className=" row custom-gutter my-2">

                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="nice-person-checkbox"
                                            checked={formData.nicePerson}
                                            onChange={(e) => handleCheckboxChange('nicePerson', e.target.checked)}
                                             />
                                        <label>I am a nice person </label>
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="funny-person-checkbox"
                                            checked={formData.funnyPerson}
                                            onChange={(e) => handleCheckboxChange('funnyPerson', e.target.checked)}
                                             />
                                        <label>I am a funny person </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="good-reading-checkbox"
                                            checked={formData.goodReading}
                                            onChange={(e) => handleCheckboxChange('goodReading', e.target.checked)}
                                             />
                                        <label>I am good at reading </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="good-math-checkbox"
                                            checked={formData.goodMath}
                                            onChange={(e) => handleCheckboxChange('goodMath', e.target.checked)}
                                             />
                                        <label>I am good at math </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="sporty-checkbox"
                                            checked={formData.sporty}
                                            onChange={(e) => handleCheckboxChange('sporty', e.target.checked)}
                                             />
                                        <label>I am a sporty </label>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="helping-others-checkbox"
                                            checked={formData.helpingOthers}
                                            onChange={(e) => handleCheckboxChange('helpingOthers', e.target.checked)}
                                             />

                                        <label>I am helping other people </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="calm-person-checkbox"
                                            checked={formData.calmPerson}
                                            onChange={(e) => handleCheckboxChange('calmPerson', e.target.checked)}
                                             />
                                        <label>I am a calm person </label>
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button
                                    className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}
                                >
                                    Next {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="fluent:emoji-48-regular" />
                                <h5>Fun Fact</h5>
                                <p>{"(Something interesting about me)"}</p>
                            </div>

                            <form className=" mt-2">

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('funfacteone')} />
                                        {errors.funfacteone && <p className="error-message">{errors.funfacteone.message}</p>}
                                    </div>
                                </div>

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('funfacttwo')} onChange={(e) => handleInputChange('funfacttwo', e.target.value)} />
                                        {errors.funfacttwo && <p className="error-message">{errors.funfacttwo.message}</p>}
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Next {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="icon-park-twotone:color-card" />
                                <h5>Colour</h5>
                                <p>{"(My favourite color is?)"}</p>
                            </div>

                            <form className=" mt-2">
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('favcolor')} onChange={(e) => handleInputChange('favcolor', e.target.value)} />
                                        {errors.favcolor && <p className="error-message">{errors.favcolor.message}</p>}
                                    </div>
                                </div>

                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Next {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="heroicons:briefcase" />
                                <h5>Job</h5>
                                <p>{"(When I grow up, I want to be...)"}</p>
                            </div>

                            <form className=" mt-2">
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('job')} onChange={(e) => handleInputChange('job', e.target.value)} />
                                        {errors.job && <p className="error-message">{errors.job.message}</p>}
                                    </div>
                                </div>

                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Next {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            case 7:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="fluent:people-28-regular" />
                                <h5>Friend</h5>
                                <p>{"(The name of my best friend is...)"}</p>
                            </div>

                            <form className=" mt-2">
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('bestfriend')} onChange={(e) => handleInputChange('bestfriend', e.target.value)} />
                                        {errors.bestfriend && <p className="error-message">{errors.bestfriend.message}</p>}
                                    </div>
                                </div>


                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Next {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            case 8:
                return (
                    <div className="about-progression-form">

                        <div className="about-me-form">
                            <div className="about-me-form-title">
                                <Icon icon="heroicons:puzzle-piece" />
                                <h5>Hobby</h5>
                                <p>{"(My Favourite hobby is?)"}</p>
                            </div>

                            <form className=" mt-2">
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." {...register('hobby')} onChange={(e) => handleInputChange('hobby', e.target.value)} />
                                        {errors.hobby && <p className="error-message">{errors.hobby.message}</p>}
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                    style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}
                                    disabled={nextButtonColor === '#D6D6D6'}>
                                    Submit {">>>"}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="all-aboutme-progression-page">
            {renderFormContent()}


        </div>

    );


}