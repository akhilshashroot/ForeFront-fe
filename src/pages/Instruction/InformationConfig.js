import React from "react";

import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/toastr.scss"
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { ToastContainer } from "react-toastify";

const InformationConfig = (props) => {
  return (
    <>
      <Card>
        <CardBody>
          <React.Fragment>
            <h3 className="text-info text-center mb-3">
              Performance Evaluation Portal
            </h3>
            <p>
              Autowelkin One is a single window system where all employee records
              including work reports, performance scores, leave details will be
              logged for reference throughout their employment at HashRoot.
            </p>
            <h4 className="text-info">PUNCH-IN TYPES</h4>
            <p>
              Each employee shall access his Autowelkin One at the beginning of each
              shift. The check-in time shall be logged and marked as beginning
              of his/her shift.
            </p>
            <h5 className="text-info">Regular Shift</h5>
            <p>
              Regular shift punch-in from Office should be logged by selecting
              “Regular” from the drop down.
            </p>
            <p>
              Please note that the Regular Shift could be logged only using the
              Office IP. Hence make sure you disconnect any active VPN during
              punch-in and punch-out.
            </p>
            <h5 className="text-info">Extra Hours</h5>
            <p>
              If a tech is working an additional shift or working for extra
              hours, he/she should select “Extra Hours” from the drop down to
              mark your shift.
            </p>
            <p>
              This is mandatory that only working hours marked with “Extra
              Hours” is considered for calculating the Over Time.
            </p>
            <p>
              If you plan to work the “Extra Hours” immediately after completing
              the “Regular Shift”, Punch-out of the Regular Shift and punch-in
              by selecting “Extra Hours” from shift option.
            </p>
            <p>
              Please make sure that VPN is disconnected to mark Punch-in
              successfully for “Regular Shift” and “Extra Hours”.
            </p>
            <p>
              Over Time is calculated only when the Mandatory Hours is
              completed.
            </p>
            <p>
              Please note that the Extra Hours could be logged only using the
              Office IP. Hence make sure you disconnect any active VPN during
              punch-in and punch-out.
            </p>
            <h5 className="text-info">Flexi Hours</h5>
            <p>
              Flexi Hours are meant to record activities and works done other
              than regular works, as or when required by the client or company.
            </p>
            <h5 className="text-info">Work From Home</h5>
            <p>
              An employee is eligible for 15 home logins per year. Every
              additional home logins exceeding this count will be calculated as
              half casual leaves. Further home logins taken after using up 6
              casual leaves in this manner shall be accounted as Half Day LOP.
            </p>
            <p>
              The designations L1 server engineer and Server Engineer Intern is
              not eligible for home logins.
            </p>
            <p>
              Any unreported or unauthorized home logins taken by staffs shall
              be considered as LOP.
            </p>
            <p>
              Idle Check – An idle time checker will be activated randomly
              through Autowelkin One during home logins. With this a counter will
              automatically count the time until you acknowledge the pop-up. The
              idle time report received thus will be marked and considered for
              further actions
            </p>
            <p>
              Punching out of the portal will be marked as the end of shift. It
              is mandatory that all techs sign out of the Autowelkin One after
              concluding the shift.
            </p>
            <h4 className="text-info">WORK FLOW</h4>
            <p>
              Each employee shall access his Autowelkin One at the beginning of each
              shift. The check-in time shall be logged and marked as beginning
              of his/her shift
            </p>
            <p>
              You have to log the Daily, Weekly and Monthly activities that are
              displayed under the ‘Worksheet’ tab. The daily activities are
              valid only for that day and could not be edited the next day.
              Weekly activities can be added or modified any time a week and
              will reset on all sundays. Monthly activities can be added or
              modified any time a month and will reset at the end of every
              month.
            </p>
            <p>
              Every employee should enter the ticket records under the
              'Worksheet' tab. The entries are time stamp based and so ensure to
              make an entry, along with sufficient details of the task/ticket,
              once you complete it. Tech should separately enter the number of
              resolved and pending tickets after completing the shift.
            </p>
            <p>
              All employees should upload the snapshots of ticket queue of all
              helpdesks, after concluding their shift. If you have more than one
              helpdesk to manage, select and upload snapshot of all helpdesks.
            </p>
            <p>
              Details of any additional tasks should be added in the text box
              towards the end of the same page. We have introduced sections
              called ‘Golden responses/Thanks Replies" and "Challenge of the
              day" in the Autowelkin One where techs could log all appreciation or
              gratitude responses they receive through chats or tickets.
            </p>
            <p>
              All breaks should be marked by clicking on the Break button while
              leaving and Getin button once you join back the shift.
            </p>
            <p>
              Punching out of the portal will be marked as the end of shift. It
              is mandatory that all techs sign out of the Autowelkin One after
              concluding the shift. If you missed to punch out, the shift shall
              be closed through an automated force punch-out cron.
            </p>
            <p>
              All details of the performance evaluation will be accessible to
              each techs through their portal. Awards, recognitions, bonus and
              salary revisionsstu will be based on the information fed here.
            </p>
            <h4 className="text-info">SHIFT UPDATES</h4>
            <p>
              Techs need to perform shift update for passing information to
              other team members. This will avoid multiple Google Sheets being
              used currently. Any details including new client updates,
              scheduled tasks, new client policies, pending tickets, handled
              chats etc should be passed to other team member before you punch
              out from the Autowelkin One.
            </p>
            <h4 className="text-info">SHIFT SCHEDULE</h4>
            <p>
              The team lead or the shift admin who prepares the shift schedule
              for the team, need to update the same under 'Weekly shift' tab in
              the Autowelkin One. You could select the names of the team members
              assigned to a shift from the drop down menu.
            </p>
            <p>
              The shift updates should be saved only on Sundays - before the new
              week begins.
            </p>
            <p>
              Offs, shift swaps, leaves etc during the week should be marked in
              the schedule.
            </p>
            <p>
              Only, the team lead/shift admin who saved the initial shift would
              have the privilege to mark the changes.
            </p>
            <h4 className="text-info">SHIFT TYPES</h4>
            <p>
              The total hours to be worked by each employee will be displayed
              under “Mandatory Hours” in the PE dashboard. An employee could
              plan and set the work schedules to be completed using this
              “Mandatory Hours”. Whenever you punch-in to the shift with
              “Regular Shift” and “Home Login”, the duration will be deducted
              from the “Mandatory Hours”. Note that, there should not be any
              Mandatory hours left during the time of salary revision.
            </p>
            <p>
              Additional hours that you work from office to maintain shift
              balance due to any emergency team requirement, comes under “Extra
              Hours”. Extra hours will be calculated only if the tech punch-in
              by choosing ‘Extra Hours’ from drop down. This is compulsory that
              the additional input from your side is properly logged and
              available for calculation of “Over Time”.
            </p>
            <p>
              Overtime is calculated on the basis of Extra Hours you have taken
              after completing the Mandatory Hours. The same will be displayed
              on the Overtime counter in the PE dashboard of each tech.
            </p>
            <p>
              Break time allowed per shift is 45 minutes. All staffs are free to
              plan and take the alloted 45 minutes break, without making
              continuous absence for 30 minutes from the desk. Staffs are
              expected to take breaks for attending phone calls. It is strictly
              advised to refrain from using Mobile phones inside office or at
              office premises/corridors.
            </p>
            <p>
              It is mandatory that you mark break and get-in from the PE
              dashboard without fail. Half day LOP will be marked if a tech is
              found to move away from desk without proper breaks marked.
            </p>
            <p>
              Night Shift Break: A power nap time of 20 to 30 minutes is excused
              during the night shifts if the tech marks proper break in PE
              portal and client chat rooms separately. During night shifts,
              following shall be considered as LOP:
            </p>
            <p>
              Taking nap without marking breaks Taking nap for more than 30
              minutes, even after marking breaks.
            </p>
            <h4 className="text-info">WORK HOURS</h4>
            <p>
              The total working hours at HashRoot is 8 Hours 15 Minutes
              excluding the breaks of 45 min. However, ServerAdminz department
              has 8 hour shift including the breaks. This makes approximate 60
              minute as pending hours for each tech which SHOULD be used for the
              tasks/activities that the company assign to you, after your
              regular shift hours. This include, but not limited to R&D
              contribution, Buddy training, Interview process, Seminars,
              Workshops etc.
            </p>
            <p>Mandatory Hours : 8:15 Hours per shift</p>
            <p>Break Time : 45 Minutes</p>
            <p>Extra Hours : The time/shift after your regular shift hours</p>
            <p>Overtime Hours : Extra Hours after Mandatory hours</p>
            <p>Flexi Hours : Voluntary Hours worked (Not mandatory)</p>
            <h4 className="text-info">LEAVES, SWAPS, LOP and WFH</h4>
            <h5 className="text-info">Leave Structure</h5>
            <p>
              All employees have a total of 12 leaves (6 Casual and 6 Medical) a
              year., in addition to the regular week offs.
            </p>
            <h5 className="text-info">Casual Leave</h5>
            <p>6 days casual leave is allowed to each employee each year</p>
            <p>
              All permanent employees are eligible to avail Casual leave. The
              Leaves should be updated and got approved before 3 days from the
              required date.
            </p>
            <p>
              Upto 3 casual leaves could be taken continuously or on consecutive
              dates.
            </p>
            <p>
              Casual leaves shall be reset on 15th day of every January for all
              staffs who joined on or before January 2018.
            </p>
            <p>
              Casual leaves shall be reset every year on their respective
              joining dates for all staffs who joined after January 2018.
            </p>
            <p>
              Any additional leaves exceeding this count shall be accounted as
              LOP.
            </p>
            <h5 className="text-info">Medical Leave</h5>
            <p>
              Medical Leave may be used when the employees receive medical,
              dental or optical treatment or incapacitated by physical illness,
              injury etc
            </p>
            <p>6 days medical leave is entitled to each employee in a year.</p>
            <p>All permanent employees are eligible to avail Medical Leave.</p>
            <p>
              Norms: Any medical Leave taken for more than 2 days at a stretch
              has to be supported by a Medical Certificate. If an employee falls
              sick, he/she or their representatives is expected to inform via
              telephone, email or sms to the HR Department about his/her
              absence. Once an employee recovers and joins back work, he/she
              must inform about the no. of days of medical leave via email, for
              record to HR. Medical leave cannot be prefixed or suffixed with
              CL.
            </p>
            <p>
              Medical leaves shall be reset on 15th day of every January for all
              staffs who joined on or before January 2018.
            </p>
            <p>
              Medical leaves shall be reset every year on their respective
              joining dates for all staffs who joined after January 2018.
            </p>
            <p>
              Any additional leaves exceeding this count shall be accounted as
              LOP.
            </p>
            <h5 className="text-info">Medical Leave</h5>
            <p>
              Medical Leave may be used when the employees receive medical,
              dental or optical treatment or incapacitated by physical illness,
              injury etc
            </p>
            <p>6 days medical leave is entitled to each employee in a year.</p>
            <p>All permanent employees are eligible to avail Medical Leave.</p>
            <p>
              Norms: Any medical Leave taken for more than 2 days at a stretch
              has to be supported by a Medical Certificate. If an employee falls
              sick, he/she or their representatives is expected to inform via
              telephone, email or sms to the HR Department about his/her
              absence. Once an employee recovers and joins back work, he/she
              must inform about the no. of days of medical leave via email, for
              record to HR. Medical leave cannot be prefixed or suffixed with
              CL.
            </p>
            <p>
              Medical leaves shall be reset on 15th day of every January for all
              staffs who joined on or before January 2018.
            </p>
            <p>
              Medical leaves shall be reset every year on their respective
              joining dates for all staffs who joined after January 2018.
            </p>
            <p>
              Any additional leaves exceeding this count shall be accounted as
              LOP.
            </p>
            <h5 className="text-info">Swap Shift</h5>
            <p>
              There is no restrictions in taking swap leaves if the tech/techs
              in your team are willing to cover your shift in your absence. But
              it is mandatory to compensate the swap leave by working for the
              other tech within 30 days.
            </p>
            <p>
              You are requested to enter the name of tech/techs who will be
              handling your shift in the field "consent of" while applying for
              swap leaves.
            </p>
            <p>
              The tech who is willing to swap the shift, should also report the
              Swap through Autowelkin One.
            </p>
            <p>Swap leaves are always approved by default.</p>
            <h5 className="text-info">Loss Of Pay</h5>
            <p>
              There is no restrictions in taking LOP if the tech/techs in your
              team are willing to cover your shift in your absence.
            </p>
            <p>
              You need to get the consent from Team Leader before applying for
              LOP.
            </p>
            <p>
              Any LOP for more than 2 days at a stretch must be informed before
              7 days and any LOP more than 10 days must be informed before 30
              days.
            </p>
            <h4 className="text-info">
              PERFORMANCE REVIEW, PROMOTION & SALARY APPRAISAL
            </h4>
            <p>
              Salary revision shall be done every six months for salary scale
              below 2.5 LPA. Salary scale above 2.5LPA shall be receiving annual
              appraisal/salary revision.
            </p>
            <p>
              L1 Server Engineer shall have a performance evaluation, every 6
              months. Promotion shall be strictly based on the performance
              review held every 6 months.
            </p>
            <p>
              Designations from L2 Server Engineers shall have annual
              'promotional' reviews. A review will be scheduled every year on
              the date of Joining month to assess skill set and consider for
              promotion. A test shall be given during the review. The result of
              the same shall be considered for promotion. You shall receive a
              confirmation email once the promotion is approved.
            </p>
            <p>
              Server Engineer Trainee shall be promoted to L1 Server Engineer
              after completing the probation period. A Trainee is eligible for
              promotion if he/she is has learned all topics assigned during this
              time.
            </p>
            <p>
              On-going Training: This new scheme introduced shall include
              constant skill-set upgrade of all Server Engineer Trainee and L1
              server engineer designations. A topic or technology shall be
              assigned to you to study and update your skill-set. A review shall
              be scheduled within 3 months a topic is assigned. The performance
              at review shall be considered for Promotion. If the tech fails to
              study and update on the topic, he/she shall be assigned for
              re-training.
            </p>
            <p>
              Salary appraisal or performance revision cannot be done if there
              are any pending Mandatory Hours.
            </p>
            <h4 className="text-info">WARNINGS & SUSPENSIONS</h4>
            <p>a) Stage 1 : Orange Alert : First Level Warning</p>
            <p>b) Stage 2 : Red Alert – Final Warning</p>
            <p>c) Stage 3 : Suspension</p>
            <p>
              The warnings shall be removed after performance review or in 6
              months whichever comes first.
            </p>
            <h4 className="text-info">BUDDY</h4>
            <p>
              If a tech is assigned to train a buddy tech, the respective
              details shall be visible under his/her PE profile. Further,
            </p>
            <p>
              a) Weekly buddy review should be updated by the senior tech in
              their PE profile.
            </p>
            <p>
              b) All details of the tickets/tasks worked by the buddy tech
              should be logged by the senior tech.
            </p>
            <p>c) A monthly review and remarks should be updated regularly.</p>
            <p>
              All these details logged shall be considered for the performance
              review of buddy tech.
            </p>
            <h4 className="text-info">HASHBOOK</h4>
            <p>
              A new tab is introduced in PE dashboard to update technical tips,
              scripts, commands and other helpful information necessary to
              assist you for work. All techs are requested to add their
              contributions to this page through their own PE profile.
            </p>
            <p>
              All these details logged shall be considered for the performance
              review of buddy tech.
            </p>
            <h4 className="text-info">BLOG POSTS</h4>
            <p>
              Each tech at HashRoot should post at-least one blog every 2
              months. Points shall be added for aforementioned activities during
              the performance evaluation.
            </p>
            <h4 className="text-info">TRAINING and SEMINAR</h4>
            <p>
              Each tech at HashRoot shall be a part of employee training or
              seminars beginning. Participation in the training program or
              seminars shall be considered for performance evaluation.
            </p>
            <h4 className="text-info">DRESS CODE AND WORK STATION ETIQUETTE</h4>
            <h5 className="text-info">Dress code</h5>
            <p>
              In our work environment, clothing should be pressed and never
              wrinkled. Torn, dirty, or frayed clothing is unacceptable. All
              seams must be finished.
            </p>
            <h5 className="text-info">Shoes and Footwear</h5>
            <p>
              Conservative walking shoes, dress shoes, oxfords, loafers, boots,
              flats, dress heels, and backless shoes are acceptable for work.
              Flip-flops, slippers, sandals, distressed and funky shoes are not
              acceptable.
            </p>
            <h5 className="text-info">Work stations</h5>
            <p>
              All office utilities including chairs, cables, laptops and other
              peripheral devices will be assigned codes and labeled accordingly.
              Weekly audits will be performed to corroborate the label status.
              Any tampered stickers or misplaced devices or chairs will be the
              sole responsibility of the tech in the shift. Always make sure
              that the labels are in place and not tampered. Performance issues
              of computers shall be informed to welfare@hashroot.com and get
              replaced or repaired. You shall not exchange or replace any
              laptops of other teams or cubicle without consent from HR or
              Welfare Team.
            </p>
            <h5 className="text-info">Music System</h5>
            <p>
              Speaker systems are installed at office with a good intention that
              you can relieve from the work stress. Avoid playing music in
              unbearable volume.
            </p>
            <h5 className="text-info">Midnight snacks</h5>
            <p>
              Snacks shall be kept at the interview cabin from where you may
              have it. Avoid eating at the workstation.
            </p>
            <h4 className="text-info">PUBLIC REVIEWS</h4>
            <p>
              All employees are requested to be a part of company social media
              activities and promotions. Reviews were intended to boost the
              Digital Marketing side of our company and we expect each of you to
              post a sincere review. We truly appreciate your feedback - pros or
              cons, which has aided in bringing about many improvements in the
              work environment. Because, effective feedback, is very helpful and
              a valuable information that will be used to make important
              decisions. However, illegitimate and untrue reviews posted during
              or after the employment with HashRoot, intended only for
              destroying the public image of the company shall not be succumbed
              and will face strict actions.
            </p>
            <h4 className="text-info">REFER AND EARN</h4>
            <p>
              Any techs who refer experienced candidates for live openings will
              be eligible for Rs 5000, if the candidate completes 3 months of
              service with us.
            </p>
            <h4 className="text-info">ANONYMOUS FEEDBACK</h4>
            <p>
              As a best practice followed in the company, HashRoot has an
              anonymous feedback page{" "}
              <a href=" https://www.hashroot.com/feedback/" target="_blank">Feedback</a> which directly
              route to the CEO, as a measure to make sure every voice is heard
              and suggestions are addressed properly.
            </p>
          </React.Fragment>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(InformationConfig);
