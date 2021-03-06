import {Component, OnInit} from '@angular/core';
import {CtrService} from '../services/ctr-service.service';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../loader/loader.service';

@Component({
  selector: 'app-ad-completion',
  templateUrl: './ad-completion.component.html',
  styleUrls: ['./ad-completion.component.css']
})
export class AdCompletionComponent implements OnInit {

  datasets: any;
  legend: any;
  chartType: any;
  options: any;
  labels: any;
  isDisabled: boolean;
  object: any;
  showing = false;
  dbName = '';

  constructor(private serviceService: CtrService, private router: ActivatedRoute, public loaderService: LoaderService) {
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.isDisabled = true;

    this.router.paramMap.subscribe(params => {
      this.dbName = params.get('name') + '';
    });
  }

  getData(): any {
    this.serviceService.getTotalAdCompletion(this.dbName).subscribe((object: any) => {
      this.isDisabled = false;
      this.object = object.total_ad_show_complete_in_cross_promo;
      this.labels = object.c1;
      this.datasets = [{
        data: object.total_ad_show_complete_in_quit_panel,
        label: 'total_ad_show_complete_in_quit_panel',
        backgroundColor: 'rgba(166, 242, 99,0.8)'
      },
        {
          data: object.total_ad_show_complete_in_more_games,
          label: 'total_ad_show_complete_in_more_games',
          backgroundColor: 'rgba(0,0,0,0.8)'
        }
      ];
      this.chartType = 'bar';
      this.options = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 90,
              beginAtZero: true,
            },
            scaleLabel: {
              display: false,
              labelString: 'total ad completion'
            }
          }],
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 90
            },
            scaleLabel: {
              display: true,
              labelString: 'Promo Ad'
            }
          }]
        }
      };
    });
  }

  showCrossPromo(): any {
    if (!this.showing) {
      this.datasets.push({
        data: this.object,
        label: 'total_ad_show_complete_in_cross_promo',
        backgroundColor: 'rgba(255,0,0,0.6)'
      });
    } else {
      this.datasets.pop();
    }
    this.showing = !this.showing;

  }
}
