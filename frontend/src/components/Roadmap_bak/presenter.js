import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    Header, 
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import './styles.css';

const Roadmap = (props, context) => {
    return(
        <div>            
            <Header>RoadMap</Header>            
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={context.t("2019 - 5월")}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', fontSize:"50px"}}
                    icon={<FontAwesomeIcon icon="stroopwafel" />}
                >
                    <h3 className="vertical-timeline-element-title">{context.t("프리세일")}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{context.t("프리세일 시작하자")}</h4>
                    <p>
                        {context.t("드디어 기다리던 프리세일 시작 주저리주저리주저리주저리주저리주저리")}
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={context.t("2019 - 6월")}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', fontSize:"50px"}}
                    icon={<FontAwesomeIcon icon="stroopwafel" />}
                >
                    <h3 className="vertical-timeline-element-title">{context.t("메인세일")}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{context.t("메인세일 시작하자")}</h4>
                    <p>
                        {context.t("드디어 기다리던 메인세일 시작 주저리주저리주저리주저리주저리주저리")}
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date={context.t("2019 - 7월")}
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff', fontSize:"50px"}}
                    icon={<FontAwesomeIcon icon="stroopwafel" />}
                >
                    <h3 className="vertical-timeline-element-title">{context.t("지갑런칭")}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{context.t("지갑런칭 시작하자")}</h4>
                    <p>
                        {context.t("드디어 기다리던 지갑런칭 시작 주저리주저리주저리주저리주저리주저리")}
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date={context.t("2019 - 8월")}
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff', fontSize:"50px"}}
                    icon={<FontAwesomeIcon icon="stroopwafel" />}
                >
                    <h3 className="vertical-timeline-element-title">{context.t("홈페이지런칭")}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{context.t("홈페이지런칭 시작하자")}</h4>
                    <p>
                        {context.t("드디어 기다리던 홈페이지런칭 시작 주저리주저리주저리주저리주저리주저리")}
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date={context.t("2019 - 10월")}
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff', fontSize:"50px"}}
                    icon={<FontAwesomeIcon icon="stroopwafel" />}
                >
                    <h3 className="vertical-timeline-element-title">{context.t("거래소 상장")}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{context.t("거래소 상장 시작하자")}</h4>
                    <p>
                        {context.t("드디어 기다리던 거래소 상장 시작 주저리주저리주저리주저리주저리주저리")}
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    )
}

Roadmap.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
}

Roadmap.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Roadmap;