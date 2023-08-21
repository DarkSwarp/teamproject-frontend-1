import React, { useState } from 'react';
import {
  FormWrap,
  FieldWrap,
  Label,
  Input,
  BdayIcon,
  StyledDatePickerInputWrapper,
  InputWrapperL,
  InputWrapperR,
  ErrorText,
  Form,
  ImageContainer,
  UserImage,
  Upload,
  UserInfoWrap,
  UserName,
  UserStatus,
  SaveChangesBtn,
  DatePickerWrapperStyles,
} from './UserForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { selectUser } from 'redux/auth/selectors';
import icon from 'assets/icons/symbol-defs.svg';
import { Icon } from './UserForm.styled';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth, eachYearOfInterval, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import { useRef } from 'react';
import { updateUserAccount } from 'redux/auth/operations';
import Swal from 'sweetalert2';

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .max(16, 'Max 16 characters')
    .min(2, 'Min 2 characters'),
  email: yup.string().email('Invalid email'),
  birthday: yup.date(),
  phone: yup.string(),
  skype: yup.string().max(16, 'Max 16 characters').min(5, 'Min 5 characters'),
  password: yup.string().min(7, 'Must be at least 7 characters long'),
});
const formData = new FormData();

const UserForm = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userBirthday, setUserBirthday] = useState(user.birthday || new Date());
  const [userAvatar, setUserAvatar] = useState(user.avatarURL);
  const [userAvatarLocal, setUserAvatarLocal] = useState(user.avatarURL);

  // const date = format(new Date(userBirthday), 'yyyy-MM-dd');
  // console.log(date);

  const handleSubmit = values => {
    const updateUser = {
      name: values.userName,
      email: values.email,
      birthday: userBirthday,
      phone: values.phone,
      skype: values.skype,
      avatar: userAvatar,
      password: values.password,
    };
    console.log(values.phone);
    console.log(userAvatar);
    Object.entries(updateUser).forEach(([key, value]) => {
      if (value) {
        if (typeof value === 'string') {
          formData.append(key, value.trim());
        } else {
          formData.append(key, value);
        }
      } else if (key === 'birthday') {
        const date = format(new Date(userBirthday), 'yyyy-MM-dd');
        formData.append('birthday', date);
      }
    });


    // console.log(formData.getAll('birthday'));

    setFormSubmitted(true);
    try {
      dispatch(updateUserAccount(formData));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User with this email address already exists!',
          confirmButtonColor: '#3E85F3',
        });
      }
      console.error('Submission error:', error);
    } finally {
      setFormSubmitted(false);
    }
  };

  const years = eachYearOfInterval({
    start: new Date(1900, 0, 1),
    end: new Date(),
  });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  registerLocale('en-GB', enGB);
  setDefaultLocale('en-GB');

  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const datePickerRef = useRef(null);

  return (
    <FormWrap>
      <ImageContainer>
        <UserImage src={userAvatarLocal} alt="User Profile" />
        <Upload
          type="file"
          accept="image/*"
          onChange={e => {
            setUserAvatar(e.target.files[0]);
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = event => {
                setUserAvatarLocal(event.target.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <Icon>
          <use href={icon + '#icon-plus'}></use>
        </Icon>
      </ImageContainer>

      <UserInfoWrap>
        <UserName>{user.name}</UserName>
        <UserStatus>User</UserStatus>
      </UserInfoWrap>

      <Formik
        initialValues={{
          userName: user.name,
          email: user.email,
          phone: user.phone || '',
          skype: user.skype || '',
          password: user.password || '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        <Form autoComplete="off">
          <InputWrapperL className="left-column">
            <FieldWrap>
              <Label>User Name:</Label>
              <Input type="text" name="userName" placeholder="User Name" />
              <ErrorText name="userName" component="div" />
            </FieldWrap>

            <FieldWrap>
              <Label>Birthday:</Label>
              <StyledDatePickerInputWrapper>
                <DatePicker
                  name="birthday"
                  ref={datePickerRef}
                  formatWeekDay={nameOfDay => nameOfDay.substr(0, 1)}
                  selected={userBirthday}
                  onChange={date => setUserBirthday(date)}
                  locale="en-GB"
                  dateFormat="dd/MM/yyyy"
                  calendarStartDay={1}
                  placeholderText={`Select your birthday (current date: ${currentDateString})`}
                  onChangeRaw={e => {
                    e.preventDefault();
                    setUserBirthday(new Date(e.target.value));
                  }}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="datepicker_nav">
                      <button
                        className="datepicker_btn"
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {'<'}
                      </button>
                      <select
                        className="datepicker_select"
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map(option => (
                          <option key={option} value={getYear(option)}>
                            {getYear(option)}
                          </option>
                        ))}
                      </select>
                      <select
                        className="datepicker_select"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button
                        className="datepicker_btn"
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {'>'}
                      </button>
                    </div>
                  )}
                />
                <button
                  className="datepicker_icon_button"
                  type="button"
                  onClick={() => {
                    if (datePickerRef.current) {
                      datePickerRef.current.setOpen(true);
                    }
                  }}
                ></button>
                <BdayIcon>
                  <use href={icon + '#icon-chevron-down'}></use>
                </BdayIcon>
              </StyledDatePickerInputWrapper>
              <ErrorText name="birthday" component="div" />
            </FieldWrap>

            <FieldWrap>
              <Label>Email:</Label>
              <Input type="email" name="email" placeholder="Email" />
              <ErrorText name="email" component="div" />
            </FieldWrap>
          </InputWrapperL>

          <InputWrapperR className="right-column">
            <FieldWrap>
              <Label>Phone:</Label>
              <Input
                type="text"
                name="phone"
                placeholder="38 (097) 256 34 77"
              />
              <ErrorText name="phone" component="div" />
            </FieldWrap>

            <FieldWrap>
              <Label>Skype:</Label>
              <Input
                type="text"
                name="skype"
                placeholder="Enter your Skype ID"
              />
              <ErrorText name="skype" component="div" />
            </FieldWrap>

            <FieldWrap>
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Change your password"
              />
              <ErrorText name="password" component="div" />
            </FieldWrap>
          </InputWrapperR>

          <SaveChangesBtn type="submit" disabled={formSubmitted}>
            Save changes
          </SaveChangesBtn>

          <DatePickerWrapperStyles />
        </Form>
      </Formik>
    </FormWrap>
  );
};

// export default UserForm;
// import React, { useState } from 'react';
// import axios from 'axios'; // Assuming you're using Axios for HTTP requests

// function UserForm() {
//   const [photo, setPhoto] = useState(null);
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleSubmit = async event => {
//     event.preventDefault();

//     const formData = new FormData();
//     console.log(photo);
//     console.log(mobileNumber);
//     if (photo) {
//       formData.append('avatar', photo);
//     }
//     formData.append('phone', mobileNumber);

//     try {
//       const response = await axios.patch(
//         'http://localhost:8080/api/auth/account',
//         formData
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error updating account:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Photo:</label>
//         <input type="file" onChange={e => setPhoto(e.target.files[0])} />
//       </div>
//       <div>
//         <label>Mobile Number:</label>
//         <input
//           type="tel"
//           value={mobileNumber}
//           onChange={e => setMobileNumber(e.target.value)}
//         />
//       </div>
//       <button type="submit">Update Account</button>
//     </form>
//   );
// }
export default UserForm;
