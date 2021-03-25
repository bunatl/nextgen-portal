export const getUserFullInfoQuery = (username: string): string => (`
                        query{
                            getUserFullInfo(username: "${username}"){
                                username,
                                name,
                                compensation,
                                currentAddress,
                                pernamentAddress,
                                dob,
                                startDate,
                                ico,
                                bankAccount,
                                annualLeave,
                                employmentType,
                                notes
                            }
                        }
                    `);

export const getGetAllUsersQuery = () => (`
                        query{
                            getAllUsers{
                                username
                                name
                            }
                        }
                        `);

export const getUpdateUserDataMutation = (formData: any, emplType: string) => (`
                        mutation{
                            updateUserData(userData:{
                                username: "${formData.username}"
                                name: "${formData.name}"
                                currentAddress: "${formData.currentAddress}"
                                pernamentAddress: "${formData.pernamentAddress}"
                                dob: "${formData.dob.format("DD-MMM-YYYY")}"
                                startDate: "${formData.startDate.format("DD-MMM-YYYY")}"
                                ico: "${formData.ico}"
                                bankAccount: "${formData.bankAccount}"
                                compensation: "${formData.compensation}"
                                employmentType: "${emplType}"
                                annualLeave: "${formData.currentAnnualLeave}"
                                notes: "${formData.notes}"
                                }
                            )
                        }
                    `)