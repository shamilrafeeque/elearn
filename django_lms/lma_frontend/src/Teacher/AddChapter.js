import React from 'react'

function AddChapter() {
  return (
    <div>
              <div className="card">
                      <h3 className="card-header">Chapters <span className="float-end">Course Title</span> </h3>
                      <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Chapters</th>
                                    <th>Video</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {/* {
                                    chapters.map((chapter) => {
                                        return ( */}
                                            <tr  className="text-center">
                                                <td></td>
                                                    <td>
                                                        
                                                        <p className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1"></p>
                                                            {/* Video Modal */}
                                                                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div className="modal-dialog modal-xl">
                                                                        <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">Video Title</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                        <div className="ratio ratio-16x9">
                                                                                <iframe src="" title="YouTube video" allowFullScreen></iframe>
                                                                        </div>
                                                                        </div>
                                                                        
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                            {/* End Video Modal */}
                                                    </td>
                                                    <td></td>
                                                    <td><p className='card btn btn-danger text-decoration-none text-dark'>Delete</p></td>
                                                
                                            </tr>
                                        {/* )
                                    })
                                }
                                 */}
                                
                                
                            </tbody>

                        </table>
                        <form >
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Add More Chapters
                                </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="card">
                                        
                                        <div className="card-body">
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Chapter No</label>
                                        <div className="col-sm-6">
                                        <input type="number" name="no"   className="form-control-plaintext" id="staticEmail" placeholder="Eg: 3"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Chapter Title</label>
                                        <div className="col-sm-6">
                                        <input type="text" name="title"   className="form-control-plaintext" id="staticEmail" placeholder="Enter Here"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-6">
                                        <textarea rows="6" name="description"  type="text"  className="form-control-plaintext" id="staticEmail" placeholder="Enter Here"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Video</label>
                                        <div className="col-sm-6">
                                        <input type="file"  id="video_file"  name="video" className="form-control-plaintext"/>
                                        </div>
                                    </div>
                                    {/* accept="video/*" */}
                                    
                                
                                <button className="btn btn-dark float-end col-12">Submit</button>
                                    </div>
                                </div>
                                
                                
                                </div>
                            </div>
                            
                        </div>
                    </form>
                      </div>
                  </div>
  </div>
    
  )
}

export default AddChapter