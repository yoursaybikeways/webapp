import { get, getOr } from 'lodash/fp';
import { Card, Typography, Descriptions } from 'antd';
import { lgaLabel, tagLabel, stateLabel } from '../data';
import { Pill } from '../components/Pill';
import { colorOfStateHex } from '../colors';

const extraLink = (url, key) => {
    return <li key={key}><Typography.Link href={url} target="_blank">{url}</Typography.Link></li>
};


const InfoCard = ({picked}) => {
    const key = get('key', picked);
    const title = get('title', picked);
    const lga = get('lga', picked);
    const url = get('url', picked);
    const tags = getOr([])('tags')(picked).map(get('key'));
    const state = get('state', picked);
    const state_key = get('state.key', picked);
    const last_updated = get('last_updated', picked);
    const last_cited = get('last_cited', picked);
    const extra_links = getOr([])('extra_links')(picked);

    return (
        <Card style={{marginBottom: 4}} title="Selected">
            { (key !== undefined) ? 
                <Descriptions column={1}>
                    <Descriptions.Item label="Title"><Typography.Text>{title}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="Status"><Pill isDark color={colorOfStateHex(state)}>{stateLabel(state_key)}</Pill></Descriptions.Item>
                    <Descriptions.Item label="Authority">{lga ? <Pill>{lgaLabel(lga)}</Pill> : undefined }</Descriptions.Item>
                    <Descriptions.Item label="URL"><Typography.Link href={url} target="_blank">{url}</Typography.Link></Descriptions.Item>
                    <Descriptions.Item label="Tags">
                        <Typography.Text>
                            {tags.map(tagLabel).join(", ")}
                        </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Last updated"><Typography.Text>{last_updated}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="Last cited"><Typography.Text>{last_cited}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="Extra links">
                        <ul>
                            {extra_links.map(extraLink)}
                        </ul>
                    </Descriptions.Item>
                </Descriptions> :
                <Descriptions>
                    <Descriptions.Item>
                        Click a project on the map to see more
                    </Descriptions.Item>
                </Descriptions>
            }
        </Card>
    )
}

export { InfoCard };
