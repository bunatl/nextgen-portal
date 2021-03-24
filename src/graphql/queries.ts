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

export const getUpdateUserDataMutation = (formData: any) => (`
                        mutation{
                            updateUserData(userData:{
                                username: "${formData.username}"
                                name: "${formData.name}"
                                currentAddress: "${formData.currentAddress}"
                                pernamentAddress: "${formData.pernamentAddress}"
                                dob: "${formData.dob}"
                                startDate: "${formData.startDate}"
                                ico: "${formData.ico}"
                                bankAccount: "${formData.bankAccount}"
                                compensation: "${formData.compensation}"
                                employmentType: "${formData.employmentType}"
                                annualLeave: "${formData.annualLeave}"
                                notes: "${formData.notes}"
                                }
                            )
                        }
                    `)