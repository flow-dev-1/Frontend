
import React, { useState } from 'react';
import { Icon } from '@iconify/react';





export default function AllAboutMeForm() {

    const [currentForm, setCurrentForm] = useState(1);
    const [nextButtonColor, setNextButtonColor] = useState('#D6D6D6');
    const [formData, setFormData] = useState("");


    
   



    


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

                            <form className=" row custom-gutter mt-2" >

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>FOOD: </label>
                                        <input type="text" placeholder="Type here..." />
                                        
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>ANIMAL: </label>
                                        <input type="text" placeholder="Type here..."  />
                                        
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>PET: </label>
                                        <input type="text" placeholder="Type here..."  />
                                        
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>SUBJECT: </label>
                                        <input type="text" placeholder="Type here..."  onChange={(e) => handleInputChange('favsubject', e.target.value)} />
                                        
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

                            <form className=" mt-2" >

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." />
                                    </div>
                                </div>

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." />
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2" 
                                style={{ backgroundColor: nextButtonColor }}
                                    onClick={handleNext}>
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

                            <form className=" row custom-gutter my-2" >

                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="nice-person-checkbox"
                                            checked={formData.nicePerson}
                                            
                                             />
                                        <label>I am a nice person </label>
                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="funny-person-checkbox"
                                            checked={formData.funnyPerson}
                                            
                                             />
                                        <label>I am a funny person </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="good-reading-checkbox"
                                            checked={formData.goodReading}
                                            
                                             />
                                        <label>I am good at reading </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="good-math-checkbox"
                                            checked={formData.goodMath}
                                            
                                             />
                                        <label>I am good at math </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="sporty-checkbox"
                                            checked={formData.sporty}
                                            
                                             />
                                        <label>I am a sporty </label>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="helping-others-checkbox"
                                            checked={formData.helpingOthers}
                                           
                                             />

                                        <label>I am helping other people </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group radio-input">
                                        <input type="checkbox" name="" id="calm-person-checkbox"
                                            checked={formData.calmPerson}
                                           
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

                            <form className=" mt-2" >

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..."  />
                                       
                                    </div>
                                </div>

                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..."  />
                                        
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
                                  >
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

                            <form className=" mt-2" >
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..."  />
                                       
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
                              >
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

                            <form className=" mt-2" >
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." />
                                       
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
                                   >
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

                            <form className=" mt-2" >
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..." />
                                        
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
                                 >
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

                            <form className=" mt-2" >
                                <div className="">
                                    <div className="form-group long-input">
                                        <input type="text" placeholder="Type here..."  />
                                       
                                    </div>
                                </div>
                            </form>

                            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                                <button className="btn about-me-form-btn btn-back mx-2" onClick={handlePrevious}>
                                    {"<<<"}  Back
                                </button>
                                <button className="btn about-me-form-btn btn-next mx-2"
                                style={{ backgroundColor: nextButtonColor }}
                                onClick={handleNext}>

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