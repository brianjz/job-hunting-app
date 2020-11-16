import React, { Component } from 'react'
import Line from './Line'
import Pie from './Pie'
import Calendar from './Calendar'
import './Charting.css'

export default class Charting extends Component {
    render() {

        // calendar data - Jobs Applied by Date
        const dateOccurrence = Object.values(this.props.cards).reduce(function (acc, curr) {
            acc[curr.date] = (acc[curr.date] || 0) + 1;
            return acc
        }, {});

        const formattedData = Object.entries(dateOccurrence).map(entry => {
            return {
                day: entry[0].slice(0, 10).toString(),
                value: entry[1].toString()
            }
        })

        // pie data - Number of Applications Per Stage
        const pieData = Object.values(this.props.columns).map((column) => {
            return {
                "id": column.title,
                "label": column.title,
                "value": column.cards.length,
            }
        })

        // line data - Number of Applications by Location
        const locationOccurrence = Object.values(this.props.cards).reduce(function (acc, curr) {
            acc[curr.location.split(',')[0]] = (acc[curr.location.split(',')[0]] || 0) + 1;
            return acc
        }, {});

        const lineData = Object.entries(locationOccurrence).map(entry => {
            return {
                x: entry[0],
                y: entry[1]
            }
        })

        const formatData = [{ data: lineData }]

        return (
            <div className="charting-container">
                <center><h2>Graphs and Stats</h2></center>
                <div className="charts">
                    <div className="chart-row">
                        <div className="chart">
                            <h3><b>Number of Applications Per Stage</b></h3>
                            <Pie pieData={pieData} /></div>
                        <div className="chart">
                            <h3><b>Jobs Applied by Date</b></h3>
                            <Calendar calendarData={formattedData} /></div>
                    </div>
                    <div className="chart-row">
                        <div className="chart">
                            <h3><b>Number of Applications by Location</b></h3>
                            <Line lineData={formatData} />
                        </div>
                        <div className="chart">
                            <h3><b>Jobs Applied - List View</b></h3>

                            <div className="jobs-table" >
                                {Object.values(this.props.cards).sort((a, b) => {
                                    a = a.title.toUpperCase();
                                    b = b.title.toUpperCase();
                                    return (a < b) ? -1 : (a > b) ? 1 : 0;
                                }).map((card, i) => {
                                    {
                                        return (
                                            <div><b>{i < 9 ? `0${i + 1}` : i + 1}. {card.title}</b> - {card.company}</div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
