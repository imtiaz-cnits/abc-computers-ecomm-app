import React from 'react';

const AddProduct = () => {
    return (
        <>
            <section>
                <div>
                    <div>
                        <div className="heading-wrap">
                            <h2 className="heading">Edit</h2>
                        </div>
                        <form>
                            {/* <!-- Select Dropdowns with Add Buttons --> */}
                            <div className="row">
                                <div className="form-row select-input-box col-lg-6">
                                    <label htmlFor="select-to">Select Brand *</label>
                                    <div className="select-box-dropdown">
                                        <div className="select-dropdown-selected">
                                            <span>Select Brand</span>
                                            <span className="icon"><i className="fas fa-angle-down"></i></span>
                                        </div>
                                        <div className="select-dropdown-items">
                                            <input type="text" className="select-search-box" placeholder="Search..." />
                                            <option className="option">Select-1</option>
                                            <option className="option">Select-2</option>
                                            <option className="option">Select-2</option>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row select-input-box col-lg-6">
                                    <label htmlFor="select-to">Select Category *</label>
                                    <div className="select-box-dropdown">
                                        <div className="select-dropdown-selected">
                                            <span>Select Category</span>
                                            <span className="icon"><i className="fas fa-angle-down"></i></span>
                                            {/* <!-- Font Awesome angle-down icon --> */}
                                        </div>
                                        <div className="select-dropdown-items">
                                            <input type="text" className="select-search-box" placeholder="Search..." />
                                            <option className="option">Select-1</option>
                                            <option className="option">Select-2</option>
                                            <option className="option">Select-2</option>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <h3 className="heading2">Product Information</h3>
                                    <div className="mb-2">
                                        <div className="upload-profile">
                                            <div className="item">
                                                <div className="img-box">

                                                </div>

                                                <div className="profile-wrapper">
                                                    <label className="custom-file-input-wrapper">
                                                        <input type="file" className="custom-file-input" aria-label="Upload Photo" />
                                                    </label>
                                                    <p>PNG,JPEG or GIF (up to 1 MB)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="">Product Name *</label>
                                        <input type="text" placeholder="Product Name" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">Product Model *</label>
                                        <input type="text" placeholder="Product Model" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">EMEI No *</label>
                                        <input type="text" placeholder="EMEI No" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">Buying Price *</label>
                                        <input type="text" placeholder="Buying Price" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="vanilla-datepicker">Buying Date *</label>
                                        <div className="input-datepicker-wrapper">
                                            <input type="text" className="datepicker-input" placeholder="dd/mm/yyyy" />
                                            <i className="fas fa-calendar-alt icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h3 className="heading2">Buyer Information</h3>
                                    <div className="mb-2">
                                        <div className="upload-profile">
                                            <div className="item">
                                                <div className="img-box">
                                                </div>

                                                <div className="profile-wrapper">
                                                    <label className="custom-file-input-wrapper">
                                                        <input type="file" className="custom-file-input" aria-label="Upload Photo" />
                                                    </label>
                                                    <p>PNG,JPEG or GIF (up to 1 MB)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="">Name *</label>
                                        <input type="text" placeholder="Name" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">Mobile *</label>
                                        <input type="text" placeholder="Mobile" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">Email *</label>
                                        <input type="text" placeholder="Email" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">Address *</label>
                                        <input type="text" placeholder="Address" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="">NID *</label>
                                        <input type="text" placeholder="NID" required />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="vanilla-datepicker">Date of Birth *</label>
                                        <div className="input-datepicker-wrapper">
                                            <input type="text" className="datepicker-input" placeholder="dd/mm/yyyy" />
                                            <i className="fas fa-calendar-alt icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button type="submit" className="btn-save">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddProduct;