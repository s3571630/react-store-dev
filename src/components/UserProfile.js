import React from 'react';

export default function UserProfile(props) {
    const logout =()=>{
        global.auth.logout();
        props.close('logout');
    }
    return(
        <div className="user-profile">
                <p className="title has-addons-centered">Profile</p>
                <fieldset disabled>
                <div className="field">
                    <div className="control">
                        <label htmlFor="" className="label">Nickname</label>
                        <input type="text" className="input" defaultValue={props.user.nickname}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label htmlFor="" className="label">Email</label>
                        <input type="text" className="input"  defaultValue={props.user.email}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label htmlFor="" className="label">Type</label>
                        <input
                            type="text"
                            className="input"
                            defaultValue={props.user.type === 1 ? 'Manager' : 'General User'}
                        />
                    </div>
                </div>
            </fieldset>
            <br />
            <br />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-danger" type="button" onClick={logout}>Logout</button>
                </div>
                <div className="control">
                    <button
                        className="button"
                        type="button"
                        onClick={() => {
                            props.close();
                        }}
                    >
                        Cancel
                    </button>
                    {/* button 沒給type會提交表單 */}
                </div>
            </div>
        </div>
    )
}
